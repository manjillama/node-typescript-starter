import { Request, Response, NextFunction } from 'express';
/**
 * HOF to catch async exceptions
 * Executes the callback if no exception is caught
 *
 * @param  {function} fn handler function
 */
export default (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  fn(req, res, next).catch(next);
};
