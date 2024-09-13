import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { UUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { validateUserInfo } from '../utils/userUtils';

interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

interface UserParams {
  id: string
}

export const getUsers = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const offset = parseInt(req.query.offset as string, 10) || 0;

    const users = await UserService.getAllUsers(limit, offset);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    const { isValid, message } = validateUserInfo(name, email);
    if (!isValid) {
      return res.status(400).json({ message: message });
    }

    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error); 
  }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.deleteUser(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error); 
  }
};
