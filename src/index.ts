import app from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 8010;

// Handle uncaught exceptions (bugs) - Synchronous
process.on('uncaughtException', (err: Error) => {
  logger.info('UNHANDLED EXCEPTION 💥 SHUTTING DOWN...');
  logger.error(err.name, err);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  logger.info(`✅ Server listening on port ${PORT}`);
  logger.info(`🚀 Deploy stage: ${process.env.NODE_ENV}`);
  logger.info(`🟢 Server: ${app.locals.title}`);
});

// Handle unhandled promise rejection - Asynchronous
process.on('unhandledRejection', (err: Error) => {
  logger.info('UNHANDLED REJECTION 💥 SHUTTING DOWN...');
  logger.error(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});
