import jwt from 'jsonwebtoken';

class TokenService {
	
	/**
	 * @param {object} data
	 * @returns {string} function to generate a token string
	 */
	static generateToken(data) {
		return jwt.sign(data, process.env.SECRET, {
			expiresIn: process.env.EXPIRE_TIME,
		});
	}
}

export default TokenService;
