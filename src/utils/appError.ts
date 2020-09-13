class AppError extends Error {
  statusCode: number;
  status: String;
  isOperational: boolean;

  // External error properties
  path: String;
  errors: any[];
  value: String;
  kind: String;

  constructor(message: any, statusCode: any) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // setting a flag so that we can know the error is created using this class
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
