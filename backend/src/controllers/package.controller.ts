import { Request, Response } from 'express';
import { initDb } from '../config/db.js';

export class PackageController {
  static async getAll(req: Request, res: Response) {
    try {
      const db = await initDb();
      const packages = await db.all('SELECT * FROM tour_packages');
      const parsedPackages = packages.map(p => ({
        ...p,
        highlights: JSON.parse(p.highlights),
        itinerary: JSON.parse(p.itinerary),
        locations: JSON.parse(p.locations)
      }));
      res.json(parsedPackages);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch packages', details: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const db = await initDb();
      const p = await db.get('SELECT * FROM tour_packages WHERE id = ?', [id]);
      if (!p) {
        return res.status(404).json({ error: 'Tour package not found' });
      }
      res.json({
        ...p,
        highlights: JSON.parse(p.highlights),
        itinerary: JSON.parse(p.itinerary),
        locations: JSON.parse(p.locations)
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch package', details: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    const { title, duration, description, price, image, highlights, itinerary, locations } = req.body;
    if (!title || !duration || !description || !price || !image) {
      return res.status(400).json({ error: 'Missing required package fields' });
    }

    const packageId = 'pkg-' + Date.now();
    const highlightsStr = JSON.stringify(highlights || []);
    const itineraryStr = JSON.stringify(itinerary || []);
    const locationsStr = JSON.stringify(locations || []);

    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO tour_packages (id, title, duration, description, price, image, highlights, itinerary, locations)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [packageId, title, duration, description, price, image, highlightsStr, itineraryStr, locationsStr]
      );
      res.status(201).json({ id: packageId, title, duration, description, price, image, highlights, itinerary, locations });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to create tour package', details: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, duration, description, price, image, highlights, itinerary, locations } = req.body;

    try {
      const db = await initDb();
      const existing = await db.get('SELECT * FROM tour_packages WHERE id = ?', [id]);
      if (!existing) {
        return res.status(404).json({ error: 'Tour package not found' });
      }

      await db.run(
        `UPDATE tour_packages
         SET title = ?, duration = ?, description = ?, price = ?, image = ?, highlights = ?, itinerary = ?, locations = ?
         WHERE id = ?`,
        [
          title || existing.title,
          duration || existing.duration,
          description || existing.description,
          price !== undefined ? price : existing.price,
          image || existing.image,
          highlights ? JSON.stringify(highlights) : existing.highlights,
          itinerary ? JSON.stringify(itinerary) : existing.itinerary,
          locations ? JSON.stringify(locations) : existing.locations,
          id
        ]
      );

      res.json({ id, success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update tour package', details: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const db = await initDb();
      const result = await db.run('DELETE FROM tour_packages WHERE id = ?', [id]);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Tour package not found' });
      }
      res.json({ success: true, message: 'Tour package deleted' });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete tour package', details: error.message });
    }
  }
}
