import { Router } from 'express';
import { 
  createRegistration, 
  getRegistrations, 
  getRegistrationById 
} from '../controllers/registrationController.js';
import { validate } from '../middlewares/validate.js';
import { registrationSchema } from '../schemas/registrationSchema.js';

const router = Router();

router.route('/')
  .post(validate(registrationSchema), createRegistration)
  .get(getRegistrations);

router.route('/:id')
  .get(getRegistrationById);

export default router;