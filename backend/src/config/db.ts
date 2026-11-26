import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const cwd = process.cwd();
const hasBackendFolder = fs.existsSync(path.join(cwd, 'backend')) && fs.statSync(path.join(cwd, 'backend')).isDirectory();
let DB_PATH = hasBackendFolder ? path.join(cwd, 'backend', 'database.sqlite') : path.join(cwd, 'database.sqlite');
let JSON_DB_PATH = hasBackendFolder ? path.join(cwd, 'backend', 'database.json') : path.join(cwd, 'database.json');

export let dbInstance: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function initDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  if (dbInstance) return dbInstance;

  dbInstance = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  // Enable foreign keys
  await dbInstance.run('PRAGMA foreign_keys = ON');

  // Create tables
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin'
    );

    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      pricePerKm REAL NOT NULL,
      pricePerDay REAL NOT NULL,
      capacity INTEGER NOT NULL,
      luggage INTEGER NOT NULL,
      mileage TEXT NOT NULL,
      ac INTEGER NOT NULL,
      musicSystem INTEGER NOT NULL,
      chargingPort INTEGER NOT NULL,
      pushbackSeats INTEGER NOT NULL,
      airbags INTEGER NOT NULL,
      gps INTEGER NOT NULL,
      features TEXT NOT NULL,
      availability TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tour_packages (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      duration TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL,
      highlights TEXT NOT NULL,
      itinerary TEXT NOT NULL,
      locations TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS drivers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      licenseNumber TEXT NOT NULL,
      rating REAL NOT NULL,
      experienceYears INTEGER NOT NULL,
      status TEXT NOT NULL,
      avatar TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      avatar TEXT NOT NULL,
      date TEXT NOT NULL,
      videoUrl TEXT
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      isVideo INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT NOT NULL,
      author TEXT NOT NULL,
      date TEXT NOT NULL,
      tags TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS offers (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      discountPercentage REAL NOT NULL,
      description TEXT NOT NULL,
      validUntil TEXT NOT NULL,
      minBookingValue REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS faqs (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      customerEmail TEXT NOT NULL,
      customerPhone TEXT NOT NULL,
      pickupLocation TEXT NOT NULL,
      dropLocation TEXT NOT NULL,
      journeyType TEXT NOT NULL,
      pickupDate TEXT NOT NULL,
      pickupTime TEXT NOT NULL,
      returnDate TEXT,
      vehicleId TEXT NOT NULL,
      vehicleName TEXT NOT NULL,
      vehicleCategory TEXT NOT NULL,
      passengers INTEGER NOT NULL,
      luggage INTEGER NOT NULL,
      specialRequirement TEXT,
      couponCode TEXT,
      discountAmount REAL NOT NULL DEFAULT 0,
      totalFare REAL NOT NULL,
      paymentOption TEXT NOT NULL,
      paymentStatus TEXT NOT NULL,
      bookingStatus TEXT NOT NULL,
      driverId TEXT,
      driverName TEXT,
      createdAt TEXT NOT NULL,
      gstNumber TEXT,
      companyName TEXT
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      isRead INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      vehicleId TEXT NOT NULL,
      customerName TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS callback_requests (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      timeSlot TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending',
      createdAt TEXT NOT NULL
    );
  `);

  // Seed default admin user
  const adminUser = await dbInstance.get('SELECT * FROM users WHERE username = ?', ['admin']);
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('ShibaniAdmin2026!', 10);
    await dbInstance.run(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      ['admin', hashedPassword, 'admin']
    );
    console.log('Seeded default admin user: admin / ShibaniAdmin2026!');
  }

  // Migrate from database.json if vehicles table is empty
  const countVehicles = await dbInstance.get('SELECT COUNT(*) as count FROM vehicles');
  if (countVehicles && (countVehicles as any).count === 0 && fs.existsSync(JSON_DB_PATH)) {
    try {
      console.log('Migrating database.json data to SQLite...');
      const fileData = fs.readFileSync(JSON_DB_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);

      // Migrate Vehicles
      if (Array.isArray(parsed.vehicles)) {
        for (const v of parsed.vehicles) {
          await dbInstance.run(
            `INSERT INTO vehicles (id, name, category, image, pricePerKm, pricePerDay, capacity, luggage, mileage, ac, musicSystem, chargingPort, pushbackSeats, airbags, gps, features, availability)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              v.id,
              v.name,
              v.category,
              v.image,
              v.pricePerKm,
              v.pricePerDay,
              v.capacity,
              v.luggage,
              v.mileage,
              v.specifications.ac ? 1 : 0,
              v.specifications.musicSystem ? 1 : 0,
              v.specifications.chargingPort ? 1 : 0,
              v.specifications.pushbackSeats ? 1 : 0,
              v.specifications.airbags ? 1 : 0,
              v.specifications.gps ? 1 : 0,
              JSON.stringify(v.features),
              v.availability
            ]
          );
        }
      }

      // Migrate Tour Packages
      if (Array.isArray(parsed.tourPackages)) {
        for (const p of parsed.tourPackages) {
          await dbInstance.run(
            `INSERT INTO tour_packages (id, title, duration, description, price, image, highlights, itinerary, locations)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              p.id,
              p.title,
              p.duration,
              p.description,
              p.price,
              p.image,
              JSON.stringify(p.highlights),
              JSON.stringify(p.itinerary),
              JSON.stringify(p.locations)
            ]
          );
        }
      }

      // Migrate Drivers
      if (Array.isArray(parsed.drivers)) {
        for (const d of parsed.drivers) {
          await dbInstance.run(
            `INSERT INTO drivers (id, name, phone, licenseNumber, rating, experienceYears, status, avatar)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [d.id, d.name, d.phone, d.licenseNumber, d.rating, d.experienceYears, d.status, d.avatar]
          );
        }
      }

      // Migrate Testimonials
      if (Array.isArray(parsed.testimonials)) {
        for (const t of parsed.testimonials) {
          await dbInstance.run(
            `INSERT INTO testimonials (id, name, location, rating, comment, avatar, date, videoUrl)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [t.id, t.name, t.location, t.rating, t.comment, t.avatar, t.date, t.videoUrl || null]
          );
        }
      }

      // Migrate Gallery
      if (Array.isArray(parsed.gallery)) {
        for (const g of parsed.gallery) {
          await dbInstance.run(
            `INSERT INTO gallery (id, title, category, image, isVideo)
             VALUES (?, ?, ?, ?, ?)`,
            [g.id, g.title, g.category, g.image, g.isVideo ? 1 : 0]
          );
        }
      }

      // Migrate Blogs
      if (Array.isArray(parsed.blogs)) {
        for (const b of parsed.blogs) {
          await dbInstance.run(
            `INSERT INTO blogs (id, title, slug, summary, content, image, author, date, tags)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [b.id, b.title, b.slug, b.summary, b.content, b.image, b.author, b.date, JSON.stringify(b.tags)]
          );
        }
      }

      // Migrate Offers
      if (Array.isArray(parsed.offers)) {
        for (const o of parsed.offers) {
          await dbInstance.run(
            `INSERT INTO offers (id, code, discountPercentage, description, validUntil, minBookingValue)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [o.id, o.code, o.discountPercentage, o.description, o.validUntil, o.minBookingValue]
          );
        }
      }

      // Migrate FAQs
      if (Array.isArray(parsed.faqs)) {
        for (const f of parsed.faqs) {
          await dbInstance.run(
            `INSERT INTO faqs (id, question, answer, category)
             VALUES (?, ?, ?, ?)`,
            [f.id, f.question, f.answer, f.category]
          );
        }
      }

      // Migrate Bookings
      if (Array.isArray(parsed.bookings)) {
        for (const bk of parsed.bookings) {
          await dbInstance.run(
            `INSERT INTO bookings (id, customerName, customerEmail, customerPhone, pickupLocation, dropLocation, journeyType, pickupDate, pickupTime, returnDate, vehicleId, vehicleName, vehicleCategory, passengers, luggage, specialRequirement, couponCode, discountAmount, totalFare, paymentOption, paymentStatus, bookingStatus, driverId, driverName, createdAt, gstNumber, companyName)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              bk.id,
              bk.customerName,
              bk.customerEmail,
              bk.customerPhone,
              bk.pickupLocation,
              bk.dropLocation,
              bk.journeyType,
              bk.pickupDate,
              bk.pickupTime,
              bk.returnDate || null,
              bk.vehicleId,
              bk.vehicleName,
              bk.vehicleCategory,
              bk.passengers,
              bk.luggage,
              bk.specialRequirement || null,
              bk.couponCode || null,
              bk.discountAmount || 0,
              bk.totalFare,
              bk.paymentOption,
              bk.paymentStatus,
              bk.bookingStatus,
              bk.driverId || null,
              bk.driverName || null,
              bk.createdAt,
              bk.gstNumber || null,
              bk.companyName || null
            ]
          );
        }
      }

      // Migrate Enquiries
      if (Array.isArray(parsed.enquiries)) {
        for (const e of parsed.enquiries) {
          await dbInstance.run(
            `INSERT INTO enquiries (id, name, email, phone, subject, message, status, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [e.id, e.name, e.email, e.phone, e.subject, e.message, e.status, e.createdAt]
          );
        }
      }

      // Migrate Notifications
      if (Array.isArray(parsed.notifications)) {
        for (const n of parsed.notifications) {
          await dbInstance.run(
            `INSERT INTO notifications (id, title, message, type, createdAt, isRead)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [n.id, n.title, n.message, n.type, n.createdAt, n.isRead ? 1 : 0]
          );
        }
      }

      console.log('Migration completed successfully.');
    } catch (err) {
      console.error('Migration failed:', err);
    }
  }

  return dbInstance;
}
