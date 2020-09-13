import winston from 'winston';
require('winston-mongodb');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.metadata(),
  ),
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
  ],
});

logger.add(
  new winston.transports.MongoDB({
    db: process.env.DATABASE,
    options: {
      useUnifiedTopology: true,
    },
    level: 'error',
  }),
);

export default logger;
