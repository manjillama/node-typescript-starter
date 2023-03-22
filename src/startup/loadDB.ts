import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { keys } from '../config';

export function loadDB(): void {
  mongoose
    .connect(keys.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => logger.info(`🗄  Connected to MongoDB`));
}
