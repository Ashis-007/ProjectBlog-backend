// Utils
const logger = require('../../logger');
const {
  successResponse,
  createdSuccessResponse,
  badRequestResponse,
  serverErrorResponse,
  unprocessableEntityResponse,
} = require('../../utils/response');

// Repository
const ArticleRepository = require('../../repository/article.repository');

// Packages

// Joi
const { articleSchema } = require('../../joi');

const createArticle = async (req, res) => {
  try {
    let body = articleSchema.validate(req.body);
    if (body.error) return unprocessableEntityResponse(res, body.error.message);
    body = body.value;

    const [createdArticle, errForCreatedArticle] =await ArticleRepository.createArticle(body);
    if (errForCreatedArticle)
      return serverErrorResponse(res, errForCreatedArticle);

    return createdSuccessResponse(
      res,
      'Successfully created new article.',
      createdArticle
    );
  } catch (err) {
    logger.error(JSON.stringify(err));
    return serverErrorResponse(res, err.message);
  }
};

const fetchArticle = async (req, res) => {
  try {
    const { article_id } = req.params;
    const [article, errForArticle] = await ArticleRepository.getArticle({
      article_id,
    });
    if (errForArticle) return serverErrorResponse(res, errForArticle);

    return successResponse(res, 'Successfully fetched article.', article);
  } catch (err) {
    logger.error(JSON.stringify(err));
    return serverErrorResponse(res, err.message);
  }
};

const updateArticle = async (req, res) => {
  try {
    const { article_id } = req.params;

    let body = articleSchema.validate(req.body);
    if (body.error) return unprocessableEntityResponse(res, body.error.message);
    body = body.value;

    const [_, errForUpdatedArticle] = await ArticleRepository.updateArticle(
      { article_id },
      body
    );
    if (errForUpdatedArticle)
      return serverErrorResponse(res, errForUpdatedArticle);

    return successResponse(res, 'Successfully updated article.');
  } catch (err) {
    logger.error(JSON.stringify(err));
    return serverErrorResponse(res, err.message);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { article_id } = req.params;
    const [_, errForDeleteAricle] = await ArticleRepository.deleteArticle({
      article_id,
    });
    if (errForDeleteAricle) return serverErrorResponse(res, errForDeleteAricle);

    return successResponse(res, 'Successfully deleted article.');
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
