import { Request, Response, NextFunction } from 'express';

export const requireApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.header('x-api-key');

  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized: Invalid or missing API Key',
    });
    return;
  }

  next();
};