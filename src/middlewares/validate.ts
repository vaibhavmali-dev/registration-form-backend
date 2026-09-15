import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        
        const zodError = error as ZodError;
        
        const errorMessages = zodError.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errorMessages,
        });
        return;
      }
      next(error);
    }
  };
};