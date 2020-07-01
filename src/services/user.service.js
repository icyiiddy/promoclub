import models from '../models';

const { User } = models;

class UserService {
	static createUser(user) {
		return User.create(user);
	}

	static findByProperty(property) {
		return User.findOne({ where: property });
	}
}

export default UserService;
