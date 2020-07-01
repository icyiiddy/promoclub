import UserService from '../services/user.service';
import ResponseService from '../services/response.service';

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
