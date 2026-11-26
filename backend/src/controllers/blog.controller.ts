import { Request, Response } from 'express';
import { initDb } from '../config/db.js';

export class BlogController {
  static async getAll(req: Request, res: Response) {
    try {
      const db = await initDb();
      const blogs = await db.all('SELECT * FROM blogs ORDER BY date DESC');
      // Parse tags JSON
      const parsedBlogs = blogs.map(b => ({
        ...b,
        tags: JSON.parse(b.tags)
      }));
      res.json(parsedBlogs);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch blogs', details: error.message });
    }
  }

  static async getBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    try {
      const db = await initDb();
      const blog = await db.get('SELECT * FROM blogs WHERE slug = ?', [slug]);
      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.json({
        ...blog,
        tags: JSON.parse(blog.tags)
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch blog post', details: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    const { title, slug, summary, content, image, author, date, tags } = req.body;
    if (!title || !slug || !summary || !content || !image || !author || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const blogId = 'blog-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const tagsString = JSON.stringify(tags || []);

    try {
      const db = await initDb();
      await db.run(
        `INSERT INTO blogs (id, title, slug, summary, content, image, author, date, tags)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [blogId, title, slug, summary, content, image, author, date, tagsString]
      );
      res.status(201).json({ id: blogId, title, slug, summary, content, image, author, date, tags });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to create blog post', details: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, slug, summary, content, image, author, date, tags } = req.body;

    try {
      const db = await initDb();
      const existing = await db.get('SELECT * FROM blogs WHERE id = ?', [id]);
      if (!existing) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      await db.run(
        `UPDATE blogs
         SET title = ?, slug = ?, summary = ?, content = ?, image = ?, author = ?, date = ?, tags = ?
         WHERE id = ?`,
        [
          title || existing.title,
          slug || existing.slug,
          summary || existing.summary,
          content || existing.content,
          image || existing.image,
          author || existing.author,
          date || existing.date,
          tags ? JSON.stringify(tags) : existing.tags,
          id
        ]
      );

      res.json({ id, success: true });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update blog post', details: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const db = await initDb();
      const result = await db.run('DELETE FROM blogs WHERE id = ?', [id]);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.json({ success: true, message: 'Blog post deleted' });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to delete blog post', details: error.message });
    }
  }
}
