import { Request, Response, NextFunction } from 'express';
import { Registration } from '../models/Registration.js';


export const createRegistration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const registrationData = {
      ...req.body,
      subscribePosts: req.body.subscribePosts === 'yes',
    };

    const newRegistration = await Registration.create(registrationData);

    res.status(201).json({
      status: 'success',
      data: newRegistration,
    });
  } catch (error) {
    next(error);
  }
};


export const getRegistrations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};

export const getRegistrationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      res.status(404).json({
        status: 'error',
        message: 'Registration not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};