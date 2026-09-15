import { z } from 'zod';

export const registrationSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  dateOfBirth: z.string().date(),
  parentFirstName: z.string().trim().min(1, "Mother/Father's First Name is required"),
  parentLastName: z.string().trim().optional(),
  email: z.string().trim().min(1).email().toLowerCase(),
  pinCode: z.string().regex(/^[A-Za-z0-9\s-]{3,10}$/),
  country: z.string().min(1),
  timeZone: z.string().min(1),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/),
  seriesName: z.string().min(1),
  festival: z.string().min(1),
  eventDate: z.string().date(),
  eventTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/),
  showOtherWorkshops: z.boolean().default(false),
  showOtherSeries: z.boolean().default(false),
  subscribePosts: z.enum(['yes', 'no']),
});

export type RegistrationData = z.infer<typeof registrationSchema>;