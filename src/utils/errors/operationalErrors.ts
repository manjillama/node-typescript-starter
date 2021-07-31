import { StatusCodes } from 'http-status-codes';
import AppError from './AppError';

function handleSyntaxError(error: AppError): AppError {
  const message = `Invalid data format`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleCastErrorDB(error: AppError): AppError {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleValidationErrorDB(error: AppError): AppError {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleDuplicateFieldsDB(error: AppError): AppError {
  const value = error.message.match(/"(.*?)"/)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
}

export default {
  handleSyntaxError,
  handleCastErrorDB,
  handleValidationErrorDB,
  handleDuplicateFieldsDB
};
