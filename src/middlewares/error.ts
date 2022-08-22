/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars, no-param-reassign */
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError, operationalErrors as OE } from '../utils/errors';
import { logger } from '../utils/logger';
import { config } from '../config';

const sendError = (error: AppError, req: Request, res: Response) => {
  // Mark errors as operationals
  if (error.name === 'SyntaxError' && error.message.includes('Unexpected token')) error = OE.handleSyntaxError(error);
  if (error.kind === 'ObjectId' && error.path && error.value) error = OE.handleCastErrorDB(error);
  if (error.name === 'ValidationError') error = OE.handleValidationErrorDB(error);
  if (error.name === 'MongoError' && error.code === 11000) error = OE.handleDuplicateFieldsDB(error);
  if (error.message.includes('Invalid _id')) error = OE.handleInvalidMongooseId(error);

  // If error is unknown error then log
  if (!error.isOperational)
    logger.alert(error.message, {
      metadata: { ...error, ip: req.ip, app: req.app.locals.title }
    });

  const errorResponse = {
    status: error.status,
    message: error.message,
    stack: error.stack
  };

  // Add error stack response only in development mode
  if (process.env.NODE_ENV !== config.ENVS.DEV) delete errorResponse.stack;

  res.status(error.statusCode).json(errorResponse);
};

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  sendError(error, req, res);
};

const handler = (error: AppError, req: Request, res: Response, next: NextFunction): void => {
  error.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  error.status = error.status || 'error';

  sendError(error, req, res);
};

export default { notFound, handler };
