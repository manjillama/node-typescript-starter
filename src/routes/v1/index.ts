import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import lyricRoute from './lyricRoute';

const router = Router();

router.use('/greeting', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send(
    `Hi there, good job on getting here! 🎉 \n 
      You can start by removing the boiletplace model, interfaces, routes etc with your own! 🚀`
  );
});
router.use('/lyrics', lyricRoute);

export default router;
