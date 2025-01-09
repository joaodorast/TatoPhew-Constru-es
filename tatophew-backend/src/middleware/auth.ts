import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types'; 

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as User; 
    
   
    req.user = decoded; 
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
