import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initDb } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'shibani_travels_secret_key_2026';

export class AuthController {
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      const db = await initDb();
      const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: { id: user.id, username: user.username, role: user.role }
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  }

  static async verify(req: Request, res: Response) {
    // If it passes authenticateToken, it's valid
    res.json({ valid: true, user: (req as any).user });
  }

  static async changePassword(req: Request, res: Response) {
    const { oldPassword, newPassword } = req.body;
    const userPayload = (req as any).user;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Old and new passwords are required' });
    }

    try {
      const db = await initDb();
      const user = await db.get('SELECT * FROM users WHERE id = ?', [userPayload.id]);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Incorrect old password' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await db.run('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, user.id]);

      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error: any) {
      console.error('Password change error:', error);
      res.status(500).json({ error: 'Failed to update password', details: error.message });
    }
  }
}
