import { Request, Response } from 'express';
import { initDb } from '../config/db.js';
import { sendEmail } from '../config/mail.js';

export class CallbackController {
  static async getAll(req: Request, res: Response) {
    try {
      const db = await initDb();
      const requests = await db.all('SELECT * FROM callback_requests ORDER BY createdAt DESC');
      res.json(requests);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch callback requests', details: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    const { name, phone, timeSlot } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required' });
    }

    const id = 'cb-' + Date.now();
    const createdAt = new Date().toISOString();

    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO callback_requests (id, name, phone, timeSlot, status, createdAt)
         VALUES (?, ?, ?, ?, 'Pending', ?)`,
        [id, name, phone, timeSlot || 'As Soon As Possible', createdAt]
      );

      // Create admin notification
      const notificationId = 'notif-' + Date.now();
      await db.run(
        `INSERT INTO notifications (id, title, message, type, createdAt, isRead)
         VALUES (?, ?, ?, ?, ?, 0)`,
        [
          notificationId,
          'New Callback Request',
          `Callback requested by ${name} (${phone}) for ${timeSlot || 'As Soon As Possible'}.`,
          'callback',
          createdAt
        ]
      );

      // Send email alert to Admin
      const adminSubject = `[CALLBACK REQUEST] ${name} - ${phone}`;
      const adminText = `A new callback request has been received on Shibani Travels.

Details:
------------------------------------------
Name: ${name}
Phone: ${phone}
Preferred Time: ${timeSlot || 'As Soon As Possible'}
Requested At: ${createdAt}
------------------------------------------

Please log in to the admin panel to mark this callback as resolved after calling the client.`;

      await sendEmail('admin@shibanitravels.com', adminSubject, adminText);

      res.status(201).json({ id, success: true, status: 'Pending' });
    } catch (error: any) {
      console.error('Callback creation error:', error);
      res.status(500).json({ error: 'Failed to request callback', details: error.message });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const db = await initDb();
      const existing = await db.get('SELECT * FROM callback_requests WHERE id = ?', [id]);
      if (!existing) {
        return res.status(404).json({ error: 'Callback request not found' });
      }

      await db.run(
        'UPDATE callback_requests SET status = ? WHERE id = ?',
        [status || existing.status, id]
      );

      res.json({ id, success: true, status });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update callback request', details: error.message });
    }
  }
}
