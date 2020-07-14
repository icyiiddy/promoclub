import express from 'express';
import PostController from '../controllers/post.controller';
import { allowAssessRoute } from '../middlewares/user.middleware';
import {
	validateUserPost,
	validatePostUrlParam,
  validateUserEditPost,
} from '../validations/post.validation';
import {
	checkUserAccount,
	checkPostOwner,
} from '../middlewares/post.middleware';

const router = express.Router();

router.post('/', allowAssessRoute, validateUserPost, PostController.postStatus);
router.get('/', allowAssessRoute, PostController.viewPosts);
router.get(
	'/view',
	allowAssessRoute,
	checkUserAccount,
	PostController.viewOwnPosts
);
router.patch(
	'/:postId/edit',
	allowAssessRoute,
	validatePostUrlParam,
  checkPostOwner,
  validateUserEditPost,
	PostController.editPost
);

export default router;
