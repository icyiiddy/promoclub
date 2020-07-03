import UserService from '../services/user.service';
import ResponseService from '../services/response.service';
import BcryptService from '../services/bcrypt.service';

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
