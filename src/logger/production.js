const { createLogger, format, transports } = require('winston');

const { printf, combine, timestamp, errors, prettyPrint, json } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  format: combine(
    json(),
    timestamp(),
    prettyPrint(),
    errors({ stack: true }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: './logs/server.logs',
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
