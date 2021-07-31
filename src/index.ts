import app from './app';
import { logger } from './utils';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`✅ Server listening on port ${PORT}`);
  logger.info(
    `🚀 Deploy stage: ${process.env.NODE_ENV}${
      process.env.STAGING ? ' staging' : ''
    }`,
  );
});
