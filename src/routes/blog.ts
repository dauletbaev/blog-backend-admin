import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import {
  createPost,
  getPosts,
  getPostById,
  putPost,
  patchPost,
  deletePost,
} from '../controllers/blog.controller';

const router = Router();

router.get('/', getPosts);
router.get('/:slug', getPostById);

router.post('/', authMiddleware, createPost);
router.put('/:slug', authMiddleware, putPost);
router.patch('/:slug', authMiddleware, patchPost);
router.delete('/:slug', authMiddleware, deletePost);

export default router;
