import logger from '../utils/logger';
import mongoose from 'mongoose';

export default function () {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info(`Connected to mongodb...`));
}
