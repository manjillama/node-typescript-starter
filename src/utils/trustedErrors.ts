import { StatusCodes } from 'http-status-codes';
import AppError from './appError';

export function handleValidationErrorDB(error: AppError): AppError {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

export function handleCastErrorDB(err: AppError): AppError {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}
