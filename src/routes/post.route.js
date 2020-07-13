import express from 'express';
import PostController from '../controllers/post.controller';
import { allowAssessRoute } from '../middlewares/user.middleware';
import { validateUserPost } from '../validations/post.validation';

const router = express.Router();

router.post('/', allowAssessRoute, validateUserPost, PostController.postStatus);

export default router;
