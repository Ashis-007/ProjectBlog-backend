const { createLogger, format, transports } = require('winston');

const { printf, combine, timestamp, colorize, align, errors } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp({ format: 'hh:mm:ss' }),
    align(),
    errors({ stack: true }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: './logs/dev.logs',
    }),
    new transports.File({
      level: 'error',
      filename: './logs/error.logs',
    }),
  ],
  handleExceptions: true,
  exitOnError: false,
});

module.exports = logger;
