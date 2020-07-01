import express from 'express';
import AuthController from '../controllers/auth.controller';
import { signupValidation } from '../validations/user.validation';
import { checkUserExists } from '../middlewares/user.middleware';

const router = express.Router();

router.post('/signup', checkUserExists, signupValidation, AuthController.signup);

export default router;
