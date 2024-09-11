import { Request, Response, NextFunction } from 'express';
import { fetchData } from '../services/externalApiService';

export const getExternalApiData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await fetchData(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
