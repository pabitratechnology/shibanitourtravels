import { Request, Response } from 'express';
import { initDb } from '../config/db.js';
import { sendEmail } from '../config/mail.js';

export class BookingController {
  static async getAll(req: Request, res: Response) {
    try {
      const db = await initDb();
      const bookings = await db.all('SELECT * FROM bookings ORDER BY createdAt DESC');
      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    const {
      customerName, customerEmail, customerPhone,
      pickupLocation, dropLocation, journeyType,
      pickupDate, pickupTime, returnDate,
      vehicleId, vehicleName, vehicleCategory,
      passengers, luggage, specialRequirement,
      couponCode, discountAmount, totalFare,
      paymentOption, gstNumber, companyName
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !pickupLocation || !dropLocation || !journeyType || !pickupDate || !pickupTime || !vehicleId || !vehicleName || !vehicleCategory || !totalFare) {
      return res.status(400).json({ error: 'Missing required booking fields' });
    }

    const bookingId = 'STB-' + Math.floor(100000 + Math.random() * 900000);
    const createdAt = new Date().toISOString();
    const paymentStatus = paymentOption === 'Full Payment' || paymentOption === 'Advance' ? 'Paid' : 'Pending';
    const bookingStatus = 'Pending';

    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO bookings (
          id, customerName, customerEmail, customerPhone,
          pickupLocation, dropLocation, journeyType,
          pickupDate, pickupTime, returnDate,
          vehicleId, vehicleName, vehicleCategory,
          passengers, luggage, specialRequirement,
          couponCode, discountAmount, totalFare,
          paymentOption, paymentStatus, bookingStatus,
          createdAt, gstNumber, companyName
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          bookingId, customerName, customerEmail, customerPhone,
          pickupLocation, dropLocation, journeyType,
          pickupDate, pickupTime, returnDate || null,
          vehicleId, vehicleName, vehicleCategory,
          passengers || 1, luggage || 0, specialRequirement || null,
          couponCode || null, discountAmount || 0, totalFare,
          paymentOption, paymentStatus, bookingStatus,
          createdAt, gstNumber || null, companyName || null
        ]
      );

      // Create admin notification
      const notificationId = 'notif-' + Date.now();
      await db.run(
        `INSERT INTO notifications (id, title, message, type, createdAt, isRead)
         VALUES (?, ?, ?, ?, ?, 0)`,
        [
          notificationId,
          'New Booking Received',
          `Booking ${bookingId} created by ${customerName} for ${vehicleName}.`,
          'booking',
          createdAt
        ]
      );

      // Send email to Customer
      const customerSubject = `Booking Confirmation - ${bookingId} - Shibani Travels`;
      const customerText = `Namaskar ${customerName},

Thank you for booking with Shibani Tour & Travels! We have received your booking request.

Booking Details:
------------------------------------------
Booking ID: ${bookingId}
Vehicle: ${vehicleName} (${vehicleCategory})
Pickup Location: ${pickupLocation}
Drop Location: ${dropLocation}
Journey Type: ${journeyType}
Pickup Date/Time: ${pickupDate} at ${pickupTime}
Total Estimated Fare: ₹${totalFare}
Payment Option: ${paymentOption}
------------------------------------------

Our customer representative will call you shortly to confirm the driver and vehicle details.

For any immediate queries, contact us on toll-free: 1800 120 8464 or helpline: +91 94371 00001.

Warm Regards,
Booking Team
Shibani Tour & Travels, Bhubaneswar`;

      await sendEmail(customerEmail, customerSubject, customerText);

      // Send email to Admin
      const adminSubject = `[NEW BOOKING] ID: ${bookingId} - ${customerName}`;
      const adminText = `A new booking has been placed on Shibani Travels.

Booking Details:
------------------------------------------
Booking ID: ${bookingId}
Customer: ${customerName} (${customerPhone}, ${customerEmail})
Vehicle: ${vehicleName}
Journey: ${pickupLocation} to ${dropLocation} (${journeyType})
Date/Time: ${pickupDate} at ${pickupTime}
Total Fare: ₹${totalFare}
Payment: ${paymentOption} (${paymentStatus})
Special Requests: ${specialRequirement || 'None'}
------------------------------------------

Please log in to the admin panel to assign a driver and approve.`;

      await sendEmail('admin@shibanitravels.com', adminSubject, adminText);

      res.status(201).json({ id: bookingId, success: true, bookingStatus });
    } catch (error: any) {
      console.error('Booking creation error:', error);
      res.status(500).json({ error: 'Failed to create booking', details: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { bookingStatus, driverId } = req.body;

    try {
      const db = await initDb();
      const existing = await db.get('SELECT * FROM bookings WHERE id = ?', [id]);
      if (!existing) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      let driverName = existing.driverName;
      if (driverId) {
        const driver = await db.get('SELECT name FROM drivers WHERE id = ?', [driverId]);
        if (driver) {
          driverName = driver.name;
          // Update driver status in drivers table
          await db.run("UPDATE drivers SET status = 'On Trip' WHERE id = ?", [driverId]);
        }
      }

      await db.run(
        `UPDATE bookings
         SET bookingStatus = ?, driverId = ?, driverName = ?
         WHERE id = ?`,
        [bookingStatus || existing.bookingStatus, driverId || existing.driverId, driverName, id]
      );

      // Send update email to customer
      if (bookingStatus && bookingStatus !== existing.bookingStatus) {
        const subject = `Booking Update - ${id} - Shibani Travels`;
        const text = `Namaskar ${existing.customerName},

Your booking ${id} status has been updated to: ${bookingStatus}.
${driverId ? `Driver Assigned: ${driverName}` : ''}

Thank you for choosing Shibani Tour & Travels.

Regards,
Shibani Travels Support`;
        await sendEmail(existing.customerEmail, subject, text);
      }

      res.json({ id, success: true, bookingStatus, driverId, driverName });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update booking', details: error.message });
    }
  }
}
