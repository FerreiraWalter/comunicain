import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.post('/', authMiddleware, createUser); 
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
