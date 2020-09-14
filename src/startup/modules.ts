import morgan from 'morgan';
import config from '../config';
import express, { Application } from 'express';

export default function (app: Application): void {
  app.use(express.json());
  if (process.env.NODE_ENV === config.NODE_ENV.development)
    app.use(morgan('dev'));
}
