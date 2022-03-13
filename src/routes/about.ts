import { Router } from 'express';
import { setAbout, getAbout } from '../controllers/about.controller';

const router = Router();

router.get('/', getAbout);
router.post('/', setAbout);

export default router;
