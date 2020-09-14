import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
  path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`),
});

import 'express-async-errors';
import express, { Application } from 'express';
import loadRoutes from './startup/routes';
import loadModules from './startup/modules';
import loadDB from './startup/db';
import error from './middlewares/error';

const app: Application = express();

loadModules(app);
loadRoutes(app);
loadDB();

app.use(error);

export default app;
