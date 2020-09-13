import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import logger from './utils/logger';

// Handle uncaught exceptions (bugs) - Synchronous
process.on('uncaughtException', (err: Error) => {
  logger.info('UNHANDLED EXCEPTION 💥 SHUTTING DOWN...');
  logger.error(err.name, err);
  process.exit(1);
});

const server = app.listen(5000, () => {
  logger.info('Server listening on port 5000');
});

process.on('unhandledRejection', (err: Error) => {
  logger.info('UNHANDLED REJECTION 💥 SHUTTING DOWN...');
  logger.error(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});
