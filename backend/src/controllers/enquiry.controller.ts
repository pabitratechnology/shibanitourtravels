import { Request, Response } from 'express';
import { initDb } from '../config/db.js';
import { sendEmail } from '../config/mail.js';

export class EnquiryController {
  static async getAll(req: Request, res: Response) {
    try {
      const db = await initDb();
      const enquiries = await db.all('SELECT * FROM enquiries ORDER BY createdAt DESC');
      res.json(enquiries);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch enquiries', details: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const id = 'enq-' + Date.now();
    const createdAt = new Date().toISOString();

    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO enquiries (id, name, email, phone, subject, message, status, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, 'Pending', ?)`,
        [id, name, email, phone, subject, message, createdAt]
      );

      // Create admin notification
      const notificationId = 'notif-' + Date.now();
      await db.run(
        `INSERT INTO notifications (id, title, message, type, createdAt, isRead)
         VALUES (?, ?, ?, ?, ?, 0)`,
        [
          notificationId,
          'New Enquiry Received',
          `Enquiry from ${name} regarding "${subject}".`,
          'enquiry',
          createdAt
        ]
      );

      // Send email alert to Admin
      const adminSubject = `[NEW ENQUIRY] ${subject} - ${name}`;
      const adminText = `A new enquiry has been submitted on Shibani Travels.

Details:
------------------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message:
${message}
------------------------------------------
Submitted At: ${createdAt}

Please log in to the admin panel to view details and mark as resolved/replied.`;

      await sendEmail('admin@shibanitravels.com', adminSubject, adminText);

      res.status(201).json({ id, success: true, status: 'Pending' });
    } catch (error: any) {
      console.error('Enquiry creation error:', error);
      res.status(500).json({ error: 'Failed to submit enquiry', details: error.message });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const db = await initDb();
      const existing = await db.get('SELECT * FROM enquiries WHERE id = ?', [id]);
      if (!existing) {
        return res.status(404).json({ error: 'Enquiry not found' });
      }

      await db.run(
        'UPDATE enquiries SET status = ? WHERE id = ?',
        [status || existing.status, id]
      );

      res.json({ id, success: true, status });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update enquiry status', details: error.message });
    }
  }
}
