import app from './app';
import { logger } from './utils';
import { STARTUP_MESSAGE } from './constants';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\x1b[36m', STARTUP_MESSAGE, '\x1b[0m');

  logger.info(`✅ Server listening on port ${PORT}`);
  logger.info(`🚀 Deploy stage: ${process.env.NODE_ENV}${process.env.STAGING ? ' staging' : ''}`);
});
