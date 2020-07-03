import UserService from '../services/user.service';
import ResponseService from '../services/response.service';
import BcryptService from '../services/bcrypt.service';
import TokenService from '../services/token.service';

class AuthController {
	static async signup(req, res) {
		const newUser = await UserService.createUser({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: BcryptService.hashPassword(req.body.password),
		});

		ResponseService.setSuccess(201, 'Created', {
			id: newUser.id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			role: newUser.role,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt,
		});
		return ResponseService.send(res);
	}

	static async login(req, res) {
		const user = await UserService.findByProperty({
			email: req.body.email,
		});

		ResponseService.setSuccess(200, 'You are successfully logged in', {
			token: TokenService.generateToken({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			}),
		});
		ResponseService.send(res);
	}
}

export default AuthController;
