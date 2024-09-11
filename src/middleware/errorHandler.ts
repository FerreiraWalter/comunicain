import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customerError';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;

  console.error(`[ERROR] ${statusCode} - ${err.message}`);
  if (err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
