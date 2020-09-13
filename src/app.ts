import express, { Application } from 'express';
import loadRoutes from './startup/routes';
import loadDB from './startup/db';
import error from './middlewares/error';
import morgan from 'morgan';

const app: Application = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

loadRoutes(app);
loadDB();

app.use(error);

export default app;
