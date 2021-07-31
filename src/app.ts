/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';
import { loadDB, loadRoutes } from './startup';
import error from './middlewares/error';
import { config } from './config';

// Changing default timezone ¯\_(ツ)_/
process.env.TZ = 'Europe/Amsterdam';

const app = express();
app.locals.version = '0.0.1';

app.use(morgan(config.LOGS));
app.use(cors({ origin: config.CORS_WHITELISTS, credentials: true }));

app.use(helmet());
// Data sanitization against NOSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// For response compression i.e html, json...
app.use(compression());

app.get('/api/version', (req: Request, res: Response) => {
  res.json({
    latest: req.app.locals.version
  });
});

loadRoutes(app);
loadDB();

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;
