import winston from 'winston';
import 'winston-mongodb';

let logger;

if (process.env.NODE_ENV === 'test') {
  logger = winston.createLogger({
    transports: [new winston.transports.Console({ level: 'error' })],
  });
} else {
  logger = winston.createLogger({
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
}
export default logger;
