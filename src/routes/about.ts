import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { setAbout, getAbout } from '../controllers/about.controller';

const router = Router();

router.get('/', getAbout);
router.post('/', authMiddleware, setAbout);

export default router;
