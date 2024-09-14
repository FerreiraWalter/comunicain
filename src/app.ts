import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes'
import externalApiRoutes from './routes/externalApiRoutes';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['authorization', 'Content-Type'],
}));

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes)
app.use('/external-api', externalApiRoutes);

app.use(errorHandler);

export default app;
