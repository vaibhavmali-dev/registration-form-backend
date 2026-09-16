import { Request, Response, NextFunction } from 'express';
import { Registration } from '../models/Registration.js';


export const createRegistration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
   
    const newRegistration = await Registration.create(req.body);

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


export const updateRegistration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!updatedRegistration) {
      res.status(404).json({
        status: 'error',
        message: 'Registration not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: updatedRegistration,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteRegistration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      res.status(404).json({
        status: 'error',
        message: 'Registration not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Registration deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};


export const checkEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    
    if (!email) {
      res.status(400).json({ status: 'error', message: 'Email is required' });
      return;
    }

    const existingRegistration = await Registration.findOne({ email: email.toLowerCase() });

    res.status(200).json({
      status: 'success',
      exists: !!existingRegistration 
    });
  } catch (error) {
    next(error);
  }
};