import { Request, Response } from 'express';
import { pool } from '../config/database';
import { User } from '../types'; 


export class CartController {
  async addToCart(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user?.id; 

      if (!userId) {
        return res.status(400).json({ error: 'User not authenticated' });
      }
      
      const result = await pool.query(
        'INSERT INTO cart_items (product_id, user_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [productId, userId, quantity]
      );
      
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error adding to cart' });
    }
  }

  async getCart(req: Request, res: Response) {
    try {
      const userId = req.user?.id; 

      if (!userId) {
        return res.status(400).json({ error: 'User not authenticated' });
      }

      const result = await pool.query(
        `SELECT ci.*, p.title, p.price, p.image 
         FROM cart_items ci 
         JOIN products p ON ci.product_id = p.id 
         WHERE ci.user_id = $1`,
        [userId]
      );
      
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cart' });
    }
  }
}
