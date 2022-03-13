import { Router } from 'express';
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

router.post('/', createPost);
router.put('/:slug', putPost);
router.patch('/:slug', patchPost);
router.delete('/:slug', deletePost);

export default router;
