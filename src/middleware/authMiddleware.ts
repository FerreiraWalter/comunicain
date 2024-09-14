import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';

export const authMiddleware = (
  req: Request & { user?: string | jwt.JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};
