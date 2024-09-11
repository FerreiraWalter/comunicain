import { Request, Response } from 'express';
import { fetchData } from '../services/externalApiService';

export const getExternalApiData = async (req: Request, res: Response) => {
  try {
    const data = await fetchData(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from third party' });
  }
};
