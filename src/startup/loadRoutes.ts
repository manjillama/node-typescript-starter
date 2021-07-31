import express, { Application } from 'express';
import routesV1 from '../routes/v1';

export function loadRoutes(app: Application): void {
  app.use(express.json());
  app.use('/api/v1', routesV1);
}
