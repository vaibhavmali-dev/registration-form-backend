import { Router } from 'express';
import { 
  createRegistration, 
  getRegistrations, 
  getRegistrationById,
  updateRegistration,
  deleteRegistration
} from '../controllers/registrationController.js';
import { validate } from '../middlewares/validate.js';
import { registrationSchema } from '../schemas/registrationSchema.js';
import { requireApiKey } from '../middlewares/apiKeyAuth.js'; 

const router = Router();

// Routes for /api/registrations
router.route('/')
  .post(validate(registrationSchema), createRegistration) 
  .get(requireApiKey, getRegistrations);                  

// Routes for /api/registrations/:id
router.route('/:id')
  .get(requireApiKey, getRegistrationById)                
  .patch(requireApiKey, updateRegistration)               
  .delete(requireApiKey, deleteRegistration);            

export default router;