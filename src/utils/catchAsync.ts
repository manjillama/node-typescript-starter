// import { Request, Response, NextFunction } from 'express';
// /**
//  * HOF to catch asynchronous exceptions.
//  * If no exception is catched then it'll invoke the callback function.
//  * Incase an exception is caught it'll invoke the next() function with error as an arguement.
//  * @param {function} fn asynchronous handler function
//  * @return {function} wrapper function
//  */
// export default (
//   fn: (req: Request, res: Response, next: NextFunction) => any,
// ) => (req: Request, res: Response, next: NextFunction): void => {
//   fn(req, res, next).catch(next);
// };
