import ResponseService from '../services/response.service';
import PostService from '../services/post.service';

export const checkUserAccount = (req, res, next) => {
	if (!req.userData.id) {
		ResponseService.setError(401, 'Unauthorized, not your account');
		ResponseService.send(res);
	}
	next();
};

export async function checkPostOwner(req, res, next) {
	const post = await PostService.findPost({ id: req.params.postId });

	if (!post) {
		ResponseService.setError(404, 'No post found');
		return ResponseService.send(res);
	}

	if (req.userData.id !== post.userId) {
		ResponseService.setError(401, 'Unauthorized, not your post');
		return ResponseService.send(res);
	}
	next();
}
