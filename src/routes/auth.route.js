import express from 'express';
import passport from 'passport';
import AuthController from '../controllers/auth.controller';
import { validateSignup, validateLogin } from '../validations/user.validation';
import { checkUserExists, loginUser } from '../middlewares/user.middleware';

const router = express.Router();

router.post('/signup', checkUserExists, validateSignup, AuthController.signup);
router.post('/login', validateLogin, loginUser, AuthController.login);
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get(
	'/google/redirect',
	passport.authenticate('google', {
		session: false,
		failureRedirect: '/login',
	}),
	AuthController.loginWithSocialMedias
);
router.get('/facebook', passport.authenticate('facebook'));
router.get(
	'/facebook/redirect',
	passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
	AuthController.loginWithSocialMedias
);

export default router;
