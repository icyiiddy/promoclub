import bcrypt from 'bcrypt';

class BcryptService {
	static hashPassword(password) {
		return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
	}
}

export default BcryptService;
