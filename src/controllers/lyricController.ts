import { Request, Response, NextFunction } from 'express';
import Lyric from '../models/lyricModel';
import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/appError';

export const getAllLyrics = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Lyric.find();
    res.status(200).json({
      status: 'success',
      data: data,
    });
  }
);

export const getLyric = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Lyric.findById(req.params.id);

    if (!data)
      return next(
        new AppError('No lyric found with that id', StatusCodes.NOT_FOUND)
      );

    res.status(200).json({
      status: 'success',
      data: data,
    });
  }
);

export const addLyric = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Lyric.create(req.body);
    res.status(200).json({
      status: 'success',
      data: data,
    });
  }
);

export default { getAllLyrics, addLyric, getLyric };
