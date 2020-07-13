import ResponseService from '../services/response.service';
import PostService from '../services/post.service';

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
}

export default PostController;
