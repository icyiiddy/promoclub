import express from 'express';
import AuthController from '../controllers/auth.controller';
import { validateSignup, validateLogin } from '../validations/user.validation';
import { checkUserExists, loginUser } from '../middlewares/user.middleware';

const router = express.Router();

router.post('/signup', checkUserExists, validateSignup, AuthController.signup);
router.post('/login', validateLogin, loginUser, AuthController.login);

export default router;
