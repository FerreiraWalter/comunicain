import express from 'express';
import userRoutes from './routes/userRoutes';
import externalApiRoutes from './routes/externalApiRoutes';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/external-api', externalApiRoutes);

app.use(errorHandler);

export default app;
