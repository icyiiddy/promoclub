import ResponseService from '../services/response.service';
import PostService from '../services/post.service';
import { paginationHelper } from '../helpers';

class PostController {
	static async postStatus(req, res) {
		const { mediaFile } = req.files;
		mediaFile.mv(`./src/uploads/${mediaFile.name}`);

		const post = await PostService.createPost({
			userId: req.userData.id,
			post: req.body.post,
			mediaFile: mediaFile.name,
		});
		ResponseService.setSuccess(201, 'Your post was created', post);
		return ResponseService.send(res);
	}

	static async viewPosts(req, res) {
		const { page = 1, limit = 10 } = req.query;
		const offset = (page - 1) * limit;

		const results = await PostService.getPosts({ offset, limit });

		ResponseService.setSuccess(200, 'All posts', {
			pageMeta: paginationHelper({
				count: results.count,
				rows: results.rows,
				offset,
				limit,
			}),
			rows: results.rows,
		});
		return ResponseService.send(res);
	}

	static async viewOwnPosts(req, res) {
		const { page = 1, limit = 10 } = req.query;
		const offset = (page - 1) * limit;

		const results = await PostService.getOwnPosts(
			{ userId: req.userData.id },
			{ offset, limit }
		);
		ResponseService.setSuccess(200, 'Your posts', {
			pageMeta: paginationHelper({
				count: results.count,
				rows: results.rows,
				offset,
				limit,
			}),
			rows: results.rows,
		});
		return ResponseService.send(res);
	}

	static async editPost(req, res) {
		const { mediaFile } = req.files;
		mediaFile.mv(`./src/uploads/${mediaFile.name}`);

		const updatedPost = await PostService.updatePost(
			{ id: parseInt(req.params.postId) },
			{ post: req.body.post, mediaFile: mediaFile.name }
		);
		ResponseService.setSuccess(200, 'Post Updated', updatedPost);
		return ResponseService.send(res);
	}

	static async deletePost(req, res) {
		await PostService.destroyPost({ id: parseInt(req.params.postId) });
		ResponseService.setSuccess(200, 'Post deleted');
		return ResponseService.send(res);
	}
}

export default PostController;
