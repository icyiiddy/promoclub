import jwt from 'jsonwebtoken';

class TokenService {
	static generateToken(data) {
		return jwt.sign(data, process.env.SECRET, {
			expiresIn: process.env.EXPIRE_TIME,
		});
	}
}

export default TokenService;
