const Joi = require('joi');

const userSchema = Joi.object({
  uid: Joi.string().guid({ version: 'uuidv4' }),
  first_name: Joi.string().max(30),
  last_name: Joi.string().max(30),
  username: Joi.string().max(30),
  email: Joi.string().email(),
  password: Joi.string(),
});

module.exports = userSchema;
