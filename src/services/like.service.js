import models from '../models';

const { Like } = models;

class LikeService {
	static makeLike(property) {
		return Like.create(property);
	}

	static findLike(likeId) {
		return Like.findOne({ where: likeId });
	}

	static removeLike(userId) {
		return Like.destroy({ where: userId });
	}

	static countLike(likeId) {
		return Like.count({ where: likeId });
	}
}

export default LikeService;
