// Utils
const logger = require('../logger');

// Models
const { Article } = require('../db/models');

// Packages

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

const updateArticle = async (query, article) => {
  try {
    await Article.update(article, {
      where: query,
    });
    return [true, null];
  } catch (err) {
    logger.error(err);
    return [null, err.message];
  }
};

const deleteArticle = async (query) => {
  try {
    await Article.destroy({
      where: query,
    });
    return [true, null];
  } catch (err) {
    logger.error(err);
    return [null, err.message];
  }
};

const ArticleRepository = {
  createArticle,
  getArticle,
  getArticles,
  updateArticle,
  deleteArticle,
};

module.exports = ArticleRepository;
