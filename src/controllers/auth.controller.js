import UserService from '../services/user.service';
import ResponseService from '../services/response.service';
import BcryptService from '../services/bcrypt.service';

class AuthController {
	static async signup(req, res) {
		const newUser = await UserService.createUser({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: BcryptService.hashPassword(req.body.password),
		});

		const {
			id,
			firstName,
			lastName,
			email,
			role,
			createdAt,
			updatedAt,
		} = newUser;

		ResponseService.setSuccess(201, 'Created', {
			id,
			firstName,
			lastName,
			email,
			role,
			createdAt,
			updatedAt,
		});
		return ResponseService.send(res);
	}
}

export default AuthController;
