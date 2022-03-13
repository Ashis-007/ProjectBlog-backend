const logger = require('../logger');

const { Article } = require('../db/models');

const createArticle = async (article) => {
  try {
    const createdArticle = await Article.create(article);
    return [createdArticle?.toJSON(), null];
  } catch (err) {
    logger.error(err);
    return [null, err.message];
  }
};

const getArticle = async (query) => {
  try {
    const article = await Article.findOne({
      where: query,
    });
    return [article?.toJSON(), null];
  } catch (err) {
    logger.error(err);
    return [null, err.message];
  }
};

const getArticles = async (query) => {
  try {
    const articles = await Article.findAll({
      where: query,
    });
    return [articles?.toJSON(), null];
  } catch (err) {
    logger.error(err);
    return [null, err.message];
  }
};

module.exports = { createArticle, getArticle, getArticles };
