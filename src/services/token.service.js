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

	static verifyToken(token) {
		return jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				return err;
			}
			return decoded;
		});
	}
}

export default TokenService;
