import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { UUID } from 'crypto';
import { console } from 'inspector';

interface UserParams {
  id: UUID
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    console.log("Chegou aqui 1")
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
};

export const getUserById = async (req: Request<UserParams>, res: Response) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("chegou aqui 1")
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user', er: error });
  }
};

export const updateUser = async (req: Request<UserParams>, res: Response) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request<UserParams>, res: Response) => {
  try {
    const result = await UserService.deleteUser(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
