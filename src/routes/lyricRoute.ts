import express from 'express';
import lyricController from '../controllers/lyricController';

const router = express.Router();

router
  .route('/')
  .get(lyricController.getAllLyrics)
  .post(lyricController.addLyric);

router.route('/:id').get(lyricController.getLyric);

export default router;
