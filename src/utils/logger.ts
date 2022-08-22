import winston, { format, Logger } from 'winston';
import { config } from '../config';

// eslint-disable-next-line import/no-mutable-exports
let logger: Logger;
const { transports } = winston;
const { combine, prettyPrint, metadata } = format;

if (process.env.NODE_ENV === config.ENVS.TEST) {
  logger = winston.createLogger({
    transports: [new transports.Console({ level: 'emerg' })]
  });
} else {
  logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
      new transports.Console({
        level: 'info',
        format: combine(prettyPrint(), metadata())
      })
    ]
  });
}
export { logger };
