import { Request, Response } from 'express';
import { initDb } from '../config/db.js';
import path from 'path';
import fs from 'fs';

export class GalleryController {
  static async getAll(req: Request, res: Response) {
    try {
      const db = await initDb();
      const gallery = await db.all('SELECT * FROM gallery');
      res.json(gallery);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch gallery items', details: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    const { title, category, image, isVideo } = req.body;
    if (!title || !category || !image) {
      return res.status(400).json({ error: 'Title, category, and image path are required' });
    }

    const galleryId = 'gal-' + Date.now();
    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO gallery (id, title, category, image, isVideo)
         VALUES (?, ?, ?, ?, ?)`,
        [galleryId, title, category, image, isVideo ? 1 : 0]
      );
      res.status(201).json({ id: galleryId, title, category, image, isVideo: !!isVideo });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to add gallery item', details: error.message });
    }
  }

  static async uploadFile(req: Request, res: Response) {
    const { title, category, isVideo } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const relativePath = `/uploads/${file.filename}`;
    const galleryId = 'gal-' + Date.now();

    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO gallery (id, title, category, image, isVideo)
         VALUES (?, ?, ?, ?, ?)`,
        [galleryId, title || 'Uploaded Image', category || 'General', relativePath, isVideo === 'true' ? 1 : 0]
      );

      res.status(201).json({
        id: galleryId,
        title: title || 'Uploaded Image',
        category: category || 'General',
        image: relativePath,
        isVideo: isVideo === 'true'
      });
    } catch (error: any) {
      console.error('Gallery file upload database error:', error);
      res.status(500).json({ error: 'Failed to save uploaded gallery item', details: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const db = await initDb();
      const existing = await db.get('SELECT * FROM gallery WHERE id = ?', [id]);
      if (!existing) {
        return res.status(404).json({ error: 'Gallery item not found' });
      }

      // If the image was uploaded locally, delete the physical file
      if (existing.image.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), existing.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await db.run('DELETE FROM gallery WHERE id = ?', [id]);
      res.json({ success: true, message: 'Gallery item deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete gallery item', details: error.message });
    }
  }
}
