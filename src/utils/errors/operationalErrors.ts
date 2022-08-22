import { StatusCodes } from 'http-status-codes';
import AppError from './appError';

function handleSyntaxError(error: AppError): AppError {
  const message = `Invalid data format`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleCastErrorDB(error: AppError): AppError {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleValidationErrorDB(error: AppError): AppError {
  const errors = Object.values(error.errors).map((e) => e.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleMulterFieldError(error: AppError): AppError {
  const message = `Invalid image field '${error.field}'`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleMulterUploadLimitError(): AppError {
  const message = `Uploaded file size exceeded max size`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleDuplicateFieldsDB(error: AppError): AppError {
  const duplicateField = error.message.split('index: ')[1].split('dup key')[0].split('_')[0];
  const message = `Duplicate field ${duplicateField}. Please use another value`;
  return new AppError(message, 400);
}

function handleInvalidMongooseId(error: AppError): AppError {
  const message = `Invalid document id`;
  return new AppError(message, 400);
}

export default {
  handleSyntaxError,
  handleCastErrorDB,
  handleMulterFieldError,
  handleMulterUploadLimitError,
  handleValidationErrorDB,
  handleDuplicateFieldsDB,
  handleInvalidMongooseId
};
