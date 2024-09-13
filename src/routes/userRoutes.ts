import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware'; // Middleware de autenticação

const router = Router();

router.get('/', authMiddleware, getUsers);       // Protege a rota de listar usuários
router.get('/:id', authMiddleware, getUserById); // Protege a rota de listar usuário por ID
router.post('/', createUser);                    // Rota de criação de usuário não protegida
router.put('/:id', authMiddleware, updateUser);  // Protege a rota de atualização de usuário
router.delete('/:id', authMiddleware, deleteUser); // Protege a rota de exclusão de usuário

export default router;
