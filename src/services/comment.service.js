import models from '../models';

const { Comment, User } = models;

class CommentService {
	static createComment(comment) {
		return Comment.create(comment);
	}

	static findAndCountComments(postId, { offset, limit }) {
		return Comment.findAndCountAll({
			where: postId,
			order: [['id', 'DESC']],
			include: {
				model: User,
				attributes: [
					'id',
					'firstName',
					'lastName',
					'profilePicture',
					'role',
					'status',
				],
			},
			offset,
			limit,
		});
	}

	static findComment(commentId) {
		return Comment.findOne({ where: commentId });
	}

	static getComments() {
		return Comment.findAll();
	}

	static updateComment(commentId, property) {
		return Comment.update(property, { where: commentId, returning: true });
	}

	static destroyComment(commentId) {
		return Comment.destroy({ where: commentId });
	}
}

export default CommentService;
