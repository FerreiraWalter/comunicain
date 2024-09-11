import { Router } from 'express';
import { getExternalApiData } from '../controllers/externalApiController';

const router = Router();

router.get('/data', getExternalApiData);

export default router;
