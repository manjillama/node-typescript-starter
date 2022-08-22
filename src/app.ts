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
import { keys } from './config';

// Change default timezone ¯\_(ツ)_/
process.env.TZ = 'Europe/Amsterdam';

const app = express();
app.locals.version = '1.0.0';
app.locals.title = 'Typescript node boilerplate';
app.set('trust proxy', true);

// Parse incoming requests with JSON
app.use(express.json());
// Request logging
app.use(morgan(keys.LOGS));
// Enable CORS - Cross Origin Resource Sharing
app.use(cors({ origin: keys.CORS_WHITELISTS, credentials: true }));
// secure apps by setting various HTTP headers
app.use(helmet());
// Data sanitization against NOSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Gzip response compression
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
