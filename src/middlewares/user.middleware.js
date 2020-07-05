import UserService from '../services/user.service';
import ResponseService from '../services/response.service';
import BcryptService from '../services/bcrypt.service';
import TokenService from '../services/token.service';

/**
 * @param  {object} req
 * @param  {object} res
 * @param  {funcion} next
 * @returns {object} this function check if user exits in database
 */
export async function checkUserExists(req, res, next) {
	const user = await UserService.findByProperty({ email: req.body.email });

	if (user) {
		ResponseService.setError(
			409,
			'Email already taken, please choose another email'
		);
		return ResponseService.send(res);
	}
	next();
}
/**
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @returns {object} this function check user authentication login
 */
export async function loginUser(req, res, next) {
	const user = await UserService.findByProperty({
		email: req.body.email,
	});
	if (!user) {
		ResponseService.setError(401, 'Invalid email or password');
		return ResponseService.send(res);
	}

	if (!BcryptService.comparePassword(req.body.password, user.password)) {
		ResponseService.setError(401, 'Invalid email or password');
		return ResponseService.send(res);
	}
	next();
}
/**
 * @param  {string} accessToken
 * @param  {string} refreshToken
 * @param  {object} profile
 * @param  {function} done
 * @returns {object} this function get profile for a google user, and create a user if not exits
 */
export async function getGoogleProfileUserInfo(
	accessToken,
	refreshToken,
	profile,
	done
) {
	const user = await UserService.findByProperty({ email: profile._json.email });

	const newUser = {
		firstName: profile._json.given_name,
		lastName: profile._json.family_name,
		email: profile._json.email,
		password: BcryptService.hashPassword(Math.random().toString(36)),
	};
	if (!user) {
		await UserService.createUser(newUser);
	}
	done(null, newUser);
}

/**
 * @param  {string} accessToken
 * @param  {string} refreshToken
 * @param  {object} profile
 * @param  {function} done
 * @returns {object} this function get profile for a facebook user, and create a user if not exits
 */
export async function getFacebookProfileUserInfo(
	accessToken,
	refreshToken,
	profile,
	done
) {
	const user = await UserService.findByProperty({ email: profile._json.email });

	const newUser = {
		firstName: profile._json.first_name,
		lastName: profile._json.last_name,
		email: profile._json.email,
		password: BcryptService.hashPassword(Math.random().toString(36)),
	};

	if (!user) {
		await UserService.createUser(newUser);
	}
	done(null, newUser);
}
/**
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @returns {object} this function check if user account exists.
 */
export async function checkUserEmailExists(req, res, next) {
	const user = await UserService.findByProperty({ email: req.body.email });

	if (!user) {
		ResponseService.setError(
			404,
			'Results not found, make sure you have an account'
		);
		return ResponseService.send(res);
	}
	next();
}

export const allowAssessRoute = (req, res, next) => {
	const bearerHeader = req.headers.authorization;

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		const { name } = TokenService.verifyToken(req.token);

		if (name === 'JsonWebTokenError') {
			ResponseService.setError(401, 'Unauthorized, invalid token');
			return ResponseService.send(res);
		}
		req.userData = TokenService.verifyToken(req.token);
		next();
	} else {
		ResponseService.setError(
			403,
			'You can not proceed without setting authorization token'
		);
		return ResponseService.send(res);
	}
};
