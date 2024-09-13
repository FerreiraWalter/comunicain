import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';

const USER_JWT="admin"
const PASSWORD_JWT="admin"

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === USER_JWT && password === PASSWORD_JWT) {
    const token = jwt.sign({ username }, authConfig.secret, { expiresIn: authConfig.expiresIn });
    return res.json({ token });
  }

  return res.status(401).json({ error: 'Credenciais inválidas.' });
};
