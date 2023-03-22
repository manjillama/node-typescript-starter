import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Lyric from '../models/lyric.model';
import factoryService from '../services/factory.service';
import { StringMap } from '../types';

const getAllLyrics = async (req: Request, res: Response): Promise<void> => {
  const [lyrics, total, size] = await factoryService.getAll(Lyric, req.query as StringMap).exec();

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      lyrics,
      total,
      size
    }
  });
};

export default { getAllLyrics };
