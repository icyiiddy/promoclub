import express from 'express';
import PostController from '../controllers/post.controller';
import { allowAssessRoute } from '../middlewares/user.middleware';
import { validateUserPost } from '../validations/post.validation';
import { checkUserAccount } from '../middlewares/post.middleware';

const router = express.Router();

router.post('/', allowAssessRoute, validateUserPost, PostController.postStatus);
router.get('/', allowAssessRoute, PostController.viewPosts);
router.get('/own-posts', allowAssessRoute, checkUserAccount, PostController.viewOwnPosts);

export default router;
