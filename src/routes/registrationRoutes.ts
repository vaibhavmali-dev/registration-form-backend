import { Router } from 'express';
import { 
  createRegistration, 
  getRegistrations, 
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  checkEmailExists 
} from '../controllers/registrationController.js';
import { validate } from '../middlewares/validate.js';
import { registrationSchema } from '../schemas/registrationSchema.js';
import { requireApiKey } from '../middlewares/apiKeyAuth.js';

const router = Router();

router.route('/')
  .post(validate(registrationSchema), createRegistration)
  .get(requireApiKey, getRegistrations);

router.route('/check-email')
  .post(checkEmailExists);

router.route('/:id')
  .get(requireApiKey, getRegistrationById)
  .patch(requireApiKey, updateRegistration)
  .delete(requireApiKey, deleteRegistration);

export default router;