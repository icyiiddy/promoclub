import express from 'express';
import PostController from '../controllers/post.controller';
import { allowAssessRoute } from '../middlewares/user.middleware';
import {
	validateUserPost,
	validatePostUrlParam,
	validateUserEditPost,
} from '../validations/post.validation';
import { checkPostOwner } from '../middlewares/post.middleware';
import CommentController from '../controllers/comment.controller';
import {
	checkPostExists,
	checkComment,
} from '../middlewares/comment.middleware';
import {
	validatePostComment,
	validateUrlIds,
} from '../validations/comment.validation';

const router = express.Router();

router.post('/', allowAssessRoute, validateUserPost, PostController.postStatus);
router.get('/', allowAssessRoute, PostController.viewPosts);
router.get('/view', allowAssessRoute, PostController.viewOwnPosts);
router.patch(
	'/:postId/edit',
	allowAssessRoute,
	validatePostUrlParam,
	checkPostOwner,
	validateUserEditPost,
	PostController.editPost
);
router.delete(
	'/:postId/delete',
	allowAssessRoute,
	validatePostUrlParam,
	checkPostOwner,
	PostController.deletePost
);
router.post(
	'/:postId/comments',
	allowAssessRoute,
	validatePostUrlParam,
	checkPostExists,
	validatePostComment,
	CommentController.postComment
);
router.get(
	'/:postId/comments',
	allowAssessRoute,
	validatePostUrlParam,
	checkPostExists,
	CommentController.viewComments
);
router.patch(
	'/:postId/comments/:commentId',
	allowAssessRoute,
	validateUrlIds,
	checkPostExists,
	checkComment,
	validatePostComment,
	CommentController.editComment
);
router.delete(
	'/:postId/comments/:commentId',
	allowAssessRoute,
	validateUrlIds,
	checkPostExists,
	checkComment,
	CommentController.deleteComment
);

export default router;
