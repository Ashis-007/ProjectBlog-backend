const Joi = require('joi');

const articleSchema = Joi.object({
  article_id: Joi.number(),
  title: Joi.string(),
  body: Joi.string(),
  likes: Joi.number(),
  views: Joi.number(),
  user_id: Joi.string().guid({ version: 'uuidv4' }),
});

module.exports = articleSchema;
