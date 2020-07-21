import models from '../models';

const { Unlike } = models;

class UnlikeService {
	static makeUnlike(property) {
		return Unlike.create(property);
	}

	static findUnlike(likeId) {
		return Unlike.findOne({ where: likeId });
	}

	static removeUnlike(userId) {
		return Unlike.destroy({ where: userId });
	}

	static countUnlike(likeId) {
		return Unlike.count({ where: likeId });
	}
}

export default UnlikeService;
