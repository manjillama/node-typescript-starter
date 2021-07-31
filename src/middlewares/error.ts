/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError, operationalErrors as OE } from '../utils/errors';
import { logger } from '../utils';

const sendError = (error: AppError, res: Response) => {
  // Mark errors as operationals
  if (error.name === 'SyntaxError' && error.message.includes('Unexpected token')) error = OE.handleSyntaxError(error);
  if (error.kind === 'ObjectId' && error.path && error.value) error = OE.handleCastErrorDB(error);
  if (error.name === 'ValidationError') error = OE.handleValidationErrorDB(error);
  if (error.name === 'MongoError' && error.code === 11000) error = OE.handleDuplicateFieldsDB(error);

  // If error is unknown error
  if (!error.isOperational) {
    logger.info(`❗ Error name: ${error.name}`);
    logger.error(error.message, error);
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message
  });
};

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  sendError(error, res);
};

const handler = (error: AppError, req: Request, res: Response, next: NextFunction): void => {
  error.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  error.status = error.status || 'error';

  sendError(error, res);
};

export default { notFound, handler };
