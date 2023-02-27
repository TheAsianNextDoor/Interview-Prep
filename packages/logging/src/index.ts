import dotenv from 'dotenv';
import { createLogger, format, transports } from 'winston';

dotenv.config();

const filePrefix = process.env.LOG_PREFIX || './logs';
const { combine, label, prettyPrint, timestamp } = format;

const defaultTransports = [
  new transports.File({ filename: `${filePrefix}/error.log`, level: 'error' }),
  new transports.File({ filename: `${filePrefix}/debug.log`, level: 'debug' }),
  new transports.File({ filename: `${filePrefix}/warn.log`, level: 'warn' }),
  new transports.File({ filename: `${filePrefix}/info.log`, level: 'info' }),
  new transports.File({ filename: `${filePrefix}/http.log`, level: 'http' }),
  new transports.File({ filename: `${filePrefix}/combined.log` }),
];

const LoggerFactory = ({ service = 'please add service meta', transports = defaultTransports } = {}) =>
  createLogger({
    defaultMeta: {
      service,
    },
    format: combine(timestamp(), prettyPrint()),
    level: 'debug',
    transports,
  });

// export default logger;
export { LoggerFactory };
