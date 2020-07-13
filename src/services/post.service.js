import models from '../models';

const { Post } = models;

class PostService {
	static createPost(post) {
		return Post.create(post);
	}
}

export default PostService;
