import express from 'express';
import passport from 'passport';
import AuthController from '../controllers/auth.controller';
import {
	validateSignup,
	validateLogin,
	validateUserEmail,
	validateUserResetPassword,
	validateAdditionalInfo,
} from '../validations/user.validation';
import {
	checkUserExists,
	loginUser,
	checkUserEmailExists,
	allowAssessRoute,
} from '../middlewares/user.middleware';

const router = express.Router();

router.post('/signup', checkUserExists, validateSignup, AuthController.signup);
router.post('/login', validateLogin, loginUser, AuthController.login);
router.get(
	'/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);
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
	passport.authenticate('facebook', {
		session: false,
		failureRedirect: '/login',
	}),
	AuthController.loginWithSocialMedias
);
router.get(
	'/search-account',
	validateUserEmail,
	checkUserEmailExists,
	AuthController.SearchAccount
);
router.patch(
	'/reset-password',
	allowAssessRoute,
	validateUserResetPassword,
	AuthController.ResetPassword
);
router.post(
	'/add-info',
	validateAdditionalInfo,
	AuthController.AdditionalInformation
);

export default router;
