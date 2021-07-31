import { Router } from 'express';
import lyricController from '../../controllers/lyricController';

const router = Router();

router.get('/', lyricController.getAllLyrics);

export default router;
