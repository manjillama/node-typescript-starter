import express, { Application, Request, Response, NextFunction } from 'express';
import lyricsRouter from '../routes/lyricRoute';
import AppError from '../utils/appError';

export default function (app: Application) {
  app.use(express.json());
  app.use('/api/lyrics', lyricsRouter);
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });
}
