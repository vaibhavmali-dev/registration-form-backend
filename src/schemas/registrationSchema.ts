import { z } from 'zod';

export const registrationSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().optional(),
  
  email: z.string()
    .trim()
    .min(1, 'Email is required')
    .email('Valid Email Address is required')
    .toLowerCase(), 
    
  phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Enter a valid phone number with country code'),
  city: z.string().trim().min(1, 'City is required'),
  
  linkedInUrl: z.string().trim().url().optional().or(z.literal('')),
  portfolioUrl: z.string().trim().url().optional().or(z.literal('')),

  highestEducation: z.enum(['bachelors', 'masters', 'phd', 'diploma', 'other']),
  currentCompany: z.string().trim().optional(),
  currentRole: z.string().trim().min(1, 'Current role is required'),
  yearsOfExperience: z.enum(['fresher', '0_1', '1_3', '3_5', '5_plus']),
  primarySkill: z.string().min(1, 'Please select a primary skill'),

  currentCTC: z.string().trim().optional(),
  expectedCTC: z.string().trim().min(1, 'Expected CTC is required'),
  noticePeriod: z.enum(['immediate', '15_days', '30_days', '60_days', '90_days']),
  workSetup: z.enum(['remote', 'hybrid', 'onsite']),
  willingToRelocate: z.boolean().default(false),
});

export type RegistrationData = z.infer<typeof registrationSchema>;