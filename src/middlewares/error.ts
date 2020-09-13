import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../utils/logger';
import AppError from '../utils/appError';
import {
  handleCastErrorDB,
  handleValidationErrorDB,
} from '../utils/trustedErrors';

// GLOBAL ERROR HANDLING MIDDLEWARE
export default (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  error.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  error.status = error.status || 'error';

  if (error.kind === 'ObjectId' && error.path && error.value)
    error = handleCastErrorDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

  sendError(error, res);
};

function sendError(error: AppError, res: Response) {
  // If error is unknown error
  if (!error.isOperational) logger.error(error.message, error);

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
}
