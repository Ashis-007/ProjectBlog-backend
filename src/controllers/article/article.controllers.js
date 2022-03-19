// Utils
const logger = require('../../logger');
const {
  successResponse,
  createdSuccessResponse,
  badRequestResponse,
  serverErrorResponse,
} = require('../../utils/response');

// Repository
const ArticleRepository = require('../../repository/article.repository');

// Packages

// Joi

const createArticle = async (req, res) => {
  try {
  } catch (err) {
    logger.error(JSON.stringify(err));
    return serverErrorResponse(res, err.message);
  }
};

const fetchArticle = async (req, res) => {
  try {
  } catch (err) {
    logger.error(JSON.stringify(err));
    return serverErrorResponse(res, err.message);
  }
};

const updateArticle = async (req, res) => {
  try {
  } catch (err) {
    logger.error(JSON.stringify(err));
    return serverErrorResponse(res, err.message);
  }
};

const deleteArticle = async (req, res) => {
  try {
  } catch (err) {
    logger.error(JSON.stringify(err));
    return serverErrorResponse(res, err.message);
  }
};

const ArticleControllers = {
  createArticle,
  fetchArticle,
  updateArticle,
  deleteArticle,
};

module.exports = ArticleControllers;
