import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
  path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`),
});
import express, { Application } from 'express';
import loadRoutes from './startup/routes';
import loadDB from './startup/db';
import error from './middlewares/error';
import morgan from 'morgan';
import config from './config';

const app: Application = express();

app.use(express.json());
if (process.env.NODE_ENV === config.NODE_ENV.development)
  app.use(morgan('dev'));

loadRoutes(app);
loadDB();
app.use(error);

export default app;
