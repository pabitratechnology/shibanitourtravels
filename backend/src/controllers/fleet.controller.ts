import { Request, Response } from 'express';
import { initDb } from '../config/db.js';

export class FleetController {
  // --- Vehicles ---
  static async getVehicles(req: Request, res: Response) {
    try {
      const db = await initDb();
      const vehicles = await db.all('SELECT * FROM vehicles');
      const formatted = vehicles.map(v => ({
        id: v.id,
        name: v.name,
        category: v.category,
        image: v.image,
        pricePerKm: v.pricePerKm,
        pricePerDay: v.pricePerDay,
        capacity: v.capacity,
        luggage: v.luggage,
        mileage: v.mileage,
        specifications: {
          ac: !!v.ac,
          musicSystem: !!v.musicSystem,
          chargingPort: !!v.chargingPort,
          pushbackSeats: !!v.pushbackSeats,
          airbags: !!v.airbags,
          gps: !!v.gps
        },
        features: JSON.parse(v.features),
        availability: v.availability,
        gallery: v.gallery ? (typeof v.gallery === 'string' ? JSON.parse(v.gallery) : v.gallery) : [v.image],
        isRealFleet: !!v.isRealFleet,
        plateNumber: v.plateNumber || undefined
      }));
      res.json(formatted);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch vehicles', details: error.message });
    }
  }

  static async getVehicleById(req: Request, res: Response) {
    const { id } = req.params;
    
    // Map legacy v-* IDs and aliases to canonical vehicles
    const LEGACY_ID_MAP: Record<string, string> = {
      'v-1': 'real-mercedes-interior',
      'v-2': 'real-audi-a6-open',
      'v-3': 'ai-innova-crysta',
      'v-4': 'ai-fortuner',
      'v-5': 'ai-force-urbania',
      'v-6': 'ai-tempo-traveller',
      'v-7': 'ai-wedding-car',
      'v-8': 'ai-luxury-coach',
      'v-9': 'ai-innova-crysta',
      'v-10': 'real-honda-city',
      'v-11': 'ai-swift-dzire',
      'v-12': 'ai-swift-dzire',
      'v-13': 'ai-swift-dzire',
      'v-14': 'ai-innova-crysta',
      'v-15': 'ai-fortuner',
      'v-16': 'ai-fortuner',
      'v-17': 'ai-swift-dzire',
      'v-18': 'real-mercedes-interior',
      'v-19': 'real-audi-a6-grille',
      'v-20': 'real-jaguar-xf-hotel',
      'v-21': 'real-jaguar-xf-road',
      'v-22': 'real-audi-a6-grille',
      'v-23': 'real-audi-a6-open',
      'v-24': 'real-jaguar-xf-road',
      'v-25': 'real-honda-city',
      'v-26': 'real-tata-winger',
      'v-27': 'real-sml-coach',
      'v-28': 'real-hyundai-verna',
      'v-29': 'real-force-urbania-bronze',
      'v-30': 'real-traveller-jagannath',
      'v-31': 'real-traveller-tarini',
      'v-32': 'real-traveller-interior-led',
      'v-33': 'real-traveller-pushback',
      'swift-dzire': 'ai-swift-dzire',
      'innova-crysta': 'ai-innova-crysta',
      'fortuner': 'ai-fortuner',
      'force-urbania': 'ai-force-urbania',
      'tempo-traveller': 'ai-tempo-traveller',
      'wedding-car': 'ai-wedding-car',
      'luxury-coach': 'ai-luxury-coach',
    };

    const targetId = LEGACY_ID_MAP[id] || id;

    try {
      const db = await initDb();
      let v = await db.get('SELECT * FROM vehicles WHERE id = ?', [id]);
      if (!v && targetId !== id) {
        v = await db.get('SELECT * FROM vehicles WHERE id = ?', [targetId]);
      }
      if (!v) {
        v = await db.get('SELECT * FROM vehicles WHERE id LIKE ? OR name LIKE ?', [`%${id}%`, `%${id}%`]);
      }
      if (!v) {
        v = await db.get('SELECT * FROM vehicles LIMIT 1');
      }
      if (!v) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json({
        id: v.id,
        name: v.name,
        category: v.category,
        image: v.image,
        pricePerKm: v.pricePerKm,
        pricePerDay: v.pricePerDay,
        capacity: v.capacity,
        luggage: v.luggage,
        mileage: v.mileage,
        specifications: {
          ac: !!v.ac,
          musicSystem: !!v.musicSystem,
          chargingPort: !!v.chargingPort,
          pushbackSeats: !!v.pushbackSeats,
          airbags: !!v.airbags,
          gps: !!v.gps
        },
        features: JSON.parse(v.features),
        availability: v.availability,
        gallery: v.gallery ? (typeof v.gallery === 'string' ? JSON.parse(v.gallery) : v.gallery) : [v.image],
        isRealFleet: !!v.isRealFleet,
        plateNumber: v.plateNumber || undefined
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch vehicle', details: error.message });
    }
  }

  static async createVehicle(req: Request, res: Response) {
    const { id, name, category, image, pricePerKm, pricePerDay, capacity, luggage, mileage, specifications, features, availability } = req.body;
    if (!id || !name || !category || !image) {
      return res.status(400).json({ error: 'Missing required vehicle fields' });
    }

    const spec = specifications || {};
    const featuresStr = JSON.stringify(features || []);

    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO vehicles (id, name, category, image, pricePerKm, pricePerDay, capacity, luggage, mileage, ac, musicSystem, chargingPort, pushbackSeats, airbags, gps, features, availability)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, name, category, image,
          pricePerKm || 0, pricePerDay || 0, capacity || 4, luggage || 2, mileage || '12 kmpl',
          spec.ac ? 1 : 0, spec.musicSystem ? 1 : 0, spec.chargingPort ? 1 : 0, spec.pushbackSeats ? 1 : 0, spec.airbags ? 1 : 0, spec.gps ? 1 : 0,
          featuresStr, availability || 'Available'
        ]
      );

      res.status(201).json({ id, success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to create vehicle', details: error.message });
    }
  }

  static async updateVehicle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, category, image, pricePerKm, pricePerDay, capacity, luggage, mileage, specifications, features, availability } = req.body;

    try {
      const db = await initDb();
      const existing = await db.get('SELECT * FROM vehicles WHERE id = ?', [id]);
      if (!existing) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      const spec = specifications || {};
      const updatedAc = spec.ac !== undefined ? (spec.ac ? 1 : 0) : existing.ac;
      const updatedMusic = spec.musicSystem !== undefined ? (spec.musicSystem ? 1 : 0) : existing.musicSystem;
      const updatedPort = spec.chargingPort !== undefined ? (spec.chargingPort ? 1 : 0) : existing.chargingPort;
      const updatedSeats = spec.pushbackSeats !== undefined ? (spec.pushbackSeats ? 1 : 0) : existing.pushbackSeats;
      const updatedBags = spec.airbags !== undefined ? (spec.airbags ? 1 : 0) : existing.airbags;
      const updatedGps = spec.gps !== undefined ? (spec.gps ? 1 : 0) : existing.gps;

      await db.run(
        `UPDATE vehicles
         SET name = ?, category = ?, image = ?, pricePerKm = ?, pricePerDay = ?, capacity = ?, luggage = ?, mileage = ?,
             ac = ?, musicSystem = ?, chargingPort = ?, pushbackSeats = ?, airbags = ?, gps = ?, features = ?, availability = ?
         WHERE id = ?`,
        [
          name || existing.name,
          category || existing.category,
          image || existing.image,
          pricePerKm !== undefined ? pricePerKm : existing.pricePerKm,
          pricePerDay !== undefined ? pricePerDay : existing.pricePerDay,
          capacity !== undefined ? capacity : existing.capacity,
          luggage !== undefined ? luggage : existing.luggage,
          mileage || existing.mileage,
          updatedAc, updatedMusic, updatedPort, updatedSeats, updatedBags, updatedGps,
          features ? JSON.stringify(features) : existing.features,
          availability || existing.availability,
          id
        ]
      );

      res.json({ id, success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update vehicle', details: error.message });
    }
  }

  static async deleteVehicle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const db = await initDb();
      const result = await db.run('DELETE FROM vehicles WHERE id = ?', [id]);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json({ success: true, message: 'Vehicle deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete vehicle', details: error.message });
    }
  }

  // --- Drivers ---
  static async getDrivers(req: Request, res: Response) {
    try {
      const db = await initDb();
      const drivers = await db.all('SELECT * FROM drivers');
      res.json(drivers);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch drivers', details: error.message });
    }
  }

  static async createDriver(req: Request, res: Response) {
    const { name, phone, licenseNumber, rating, experienceYears, status, avatar } = req.body;
    if (!name || !phone || !licenseNumber) {
      return res.status(400).json({ error: 'Name, phone and license number are required' });
    }
    const id = 'drv-' + Date.now();
    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO drivers (id, name, phone, licenseNumber, rating, experienceYears, status, avatar)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, phone, licenseNumber, rating || 5.0, experienceYears || 5, status || 'Available', avatar || '/images/default_driver.png']
      );
      res.status(201).json({ id, success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to create driver', details: error.message });
    }
  }

  static async updateDriver(req: Request, res: Response) {
    const { id } = req.params;
    const { name, phone, licenseNumber, rating, experienceYears, status, avatar } = req.body;
    try {
      const db = await initDb();
      const existing = await db.get('SELECT * FROM drivers WHERE id = ?', [id]);
      if (!existing) {
        return res.status(404).json({ error: 'Driver not found' });
      }
      await db.run(
        `UPDATE drivers
         SET name = ?, phone = ?, licenseNumber = ?, rating = ?, experienceYears = ?, status = ?, avatar = ?
         WHERE id = ?`,
        [
          name || existing.name,
          phone || existing.phone,
          licenseNumber || existing.licenseNumber,
          rating !== undefined ? rating : existing.rating,
          experienceYears !== undefined ? experienceYears : existing.experienceYears,
          status || existing.status,
          avatar || existing.avatar,
          id
        ]
      );
      res.json({ id, success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update driver', details: error.message });
    }
  }

  static async deleteDriver(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const db = await initDb();
      const result = await db.run('DELETE FROM drivers WHERE id = ?', [id]);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Driver not found' });
      }
      res.json({ success: true, message: 'Driver deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete driver', details: error.message });
    }
  }

  // --- FAQs ---
  static async getFAQs(req: Request, res: Response) {
    try {
      const db = await initDb();
      const faqs = await db.all('SELECT * FROM faqs');
      res.json(faqs);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch FAQs', details: error.message });
    }
  }

  static async createFAQ(req: Request, res: Response) {
    const { question, answer, category } = req.body;
    if (!question || !answer || !category) {
      return res.status(400).json({ error: 'Question, answer, and category are required' });
    }
    const id = 'faq-' + Date.now();
    try {
      const db = await initDb();
      await db.run(
        'INSERT INTO faqs (id, question, answer, category) VALUES (?, ?, ?, ?)',
        [id, question, answer, category]
      );
      res.status(201).json({ id, success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to create FAQ', details: error.message });
    }
  }

  static async deleteFAQ(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const db = await initDb();
      await db.run('DELETE FROM faqs WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete FAQ', details: error.message });
    }
  }

  // --- Offers ---
  static async getOffers(req: Request, res: Response) {
    try {
      const db = await initDb();
      const offers = await db.all('SELECT * FROM offers');
      res.json(offers);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch offers', details: error.message });
    }
  }

  static async createOffer(req: Request, res: Response) {
    const { code, discountPercentage, description, validUntil, minBookingValue } = req.body;
    if (!code || !discountPercentage || !description || !validUntil) {
      return res.status(400).json({ error: 'Code, percentage, description and validity are required' });
    }
    const id = 'off-' + Date.now();
    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO offers (id, code, discountPercentage, description, validUntil, minBookingValue)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, code.toUpperCase(), discountPercentage, description, validUntil, minBookingValue || 0]
      );
      res.status(201).json({ id, success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to create offer', details: error.message });
    }
  }

  static async deleteOffer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const db = await initDb();
      await db.run('DELETE FROM offers WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete offer', details: error.message });
    }
  }

  // --- Testimonials ---
  static async getTestimonials(req: Request, res: Response) {
    try {
      const db = await initDb();
      const list = await db.all('SELECT * FROM testimonials ORDER BY date DESC');
      res.json(list);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch testimonials', details: error.message });
    }
  }

  static async createTestimonial(req: Request, res: Response) {
    const { name, location, rating, comment, avatar, date, videoUrl } = req.body;
    const id = 'test-' + Date.now();
    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO testimonials (id, name, location, rating, comment, avatar, date, videoUrl)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, location, rating || 5, comment, avatar || '/images/default_user.png', date || new Date().toISOString().split('T')[0], videoUrl || null]
      );
      res.status(201).json({ id, success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to add testimonial', details: error.message });
    }
  }

  // --- Notifications ---
  static async getNotifications(req: Request, res: Response) {
    try {
      const db = await initDb();
      const list = await db.all('SELECT * FROM notifications ORDER BY createdAt DESC LIMIT 50');
      const formatted = list.map(n => ({ ...n, isRead: !!n.isRead }));
      res.json(formatted);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch notifications', details: error.message });
    }
  }

  static async markNotificationsAsRead(req: Request, res: Response) {
    try {
      const db = await initDb();
      await db.run('UPDATE notifications SET isRead = 1');
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update notifications', details: error.message });
    }
  }

  // --- Reviews ---
  static async getReviews(req: Request, res: Response) {
    try {
      const db = await initDb();
      const list = await db.all('SELECT * FROM reviews ORDER BY date DESC');
      res.json(list);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
    }
  }

  static async createReview(req: Request, res: Response) {
    const { vehicleId, customerName, rating, comment } = req.body;
    if (!vehicleId || !customerName || !rating || !comment) {
      return res.status(400).json({ error: 'Missing required review fields' });
    }
    const id = 'rev-' + Date.now();
    const date = new Date().toISOString().split('T')[0];
    try {
      const db = await initDb();
      await db.run(
        'INSERT INTO reviews (id, vehicleId, customerName, rating, comment, date) VALUES (?, ?, ?, ?, ?, ?)',
        [id, vehicleId, customerName, rating, comment, date]
      );
      res.status(201).json({ id, success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to submit review', details: error.message });
    }
  }
}
