import models from '../models';

const { Post, User } = models;

class PostService {
	static createPost(post) {
		return Post.create(post);
	}

	static getPosts({ offset, limit }) {
		return Post.findAndCountAll({
			order: [['id', 'DESC']],
			offset,
			limit,
		});
	}

	static getOwnPosts(id, { offset, limit }) {
		return Post.findAndCountAll({
			where: id,
			include: {
				model: User,
				attributes: [
					'firstName',
					'lastName',
					'profilePicture',
					'role',
					'status',
				],
			},
			order: [['id', 'DESC']],
			offset,
			limit,
		});
	}
}

export default PostService;
