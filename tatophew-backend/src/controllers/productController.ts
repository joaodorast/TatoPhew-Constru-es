import { Request, Response } from 'express';
import { pool } from '../config/database';

export class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const result = await pool.query('SELECT * FROM products');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  }

  async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product' });
    }
  }
}