import { Router } from 'express';
import { getExternalApiData } from '../controllers/externalApiController';

const router = Router();

router.post('/data', getExternalApiData);

export default router;
