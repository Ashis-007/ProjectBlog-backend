require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
const http = require('http');

const app = require('./app');
const { sequelize } = require('./db/models');
const logger = require('./logger');
const { PORT, ENV } = require('./utils/config');

const server = http.createServer(app);

// Connect to db and then start the server
sequelize
  .sync({ alter: true })
  .then(() => {
    logger.info('[DATABASE] connected successfully');
    server.listen(PORT, () => {
      logger.info(`[SERVER] running on PORT-${PORT} ENV-${ENV}`);
    });
  })
  .catch((err) => logger.error(err));
