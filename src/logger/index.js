const devLogger = require('./development');
const prodLogger = require('./production');
const { ENV } = require('../utils/config');

let logger = null;

if (ENV === 'development') {
  logger = devLogger;
} else {
  logger = prodLogger;
}

logger.stream = {
  write: function (message) {
    logger.info(message);
  },
};

module.exports = logger;
