import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  if (err.code === 11000) {
    statusCode = 400; 
    const field = Object.keys(err.keyValue)[0];
    message = `An account with that ${field} already exists.`;
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val: any) => val.message).join(', ');
  }

  res.status(statusCode).json({
    status: 'error',
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};