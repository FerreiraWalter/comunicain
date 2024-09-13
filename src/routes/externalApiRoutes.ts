import { Router } from 'express';
import { getExternalApiData } from '../controllers/externalApiController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/data', authMiddleware, getExternalApiData);

export default router;
