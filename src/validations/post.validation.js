import Joi from '@hapi/joi';
import ResponseService from '../services/response.service';
import PostService from '../services/post.service';

export async function validateUserPost(req, res, next) {
	const schema = Joi.object({
		post: Joi.string().required().messages({
			'any.required': 'Post is required',
			'string.empty': 'Post is not allowed to be empty',
		}),
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.body);

	if (error) {
		const errors = error.details.map(error => error.message);
		ResponseService.setError(400, errors);
		ResponseService.send(res);
	}

	if (!req.files) {
		const post = await PostService.createPost({
      userId: req.userData.id,
      post: req.body.post,
    });
    ResponseService.setSuccess(201, 'Your post was created', post);
    return ResponseService.send(res);
	} else {
		const { mediaFile } = req.files;
		if (
			mediaFile.mimetype !== 'image/jpg' &&
			mediaFile.mimetype !== 'image/jpeg' &&
			mediaFile.mimetype !== 'image/png' &&
			mediaFile.mimetype !== 'video/mp4' &&
			mediaFile.mimetype !== 'video/x-m4v' &&
			mediaFile.mimetype !== 'image/gif'
		) {
			ResponseService.setError(
				400,
				'Only .jpg, .jpeg, .png, .mp4, .mkv, .gif file extensions are allowed'
			);
			return ResponseService.send(res);
		}

		if (mediaFile.size > 50000000) {
			ResponseService.setError(400, 'Files size must not exceed 50MB');
			return ResponseService.send(res);
		}
	}
	next();
};
