import { Router } from 'express';
import lyricController from '../../controllers/lyric.controller';

const router = Router();

router.get('/', lyricController.getAllLyrics);

export default router;
