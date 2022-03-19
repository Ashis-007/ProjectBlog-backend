const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./logger');

// imported routes
const userRoutes = require('./routes/user/user.routes');
const articleRoutes = require('./routes/articles/article.routes');

// cron jobs

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(cors());
app.use(morgan('short', { stream: logger.stream }));

// routes
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

app.get('/', (_, res) => {
  res
    .status(200)
    .send(
      '<h3 style="font-family: sans-serif;">Project Blog backend up and running...<h2>'
    );
});

module.exports = app;
