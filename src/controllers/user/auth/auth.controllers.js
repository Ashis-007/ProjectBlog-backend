// Utils
const logger = require('../../../logger');
const { SALT_ROUNDS } = require('../../../utils/config');
const { generateAccessToken } = require('../../../utils/token');
const {
  successResponse,
  createdSuccessResponse,
  serverErrorResponse,
  badRequestResponse,
  unprocessableEntityResponse,
  unauthorizedResponse,
  notFoundResponse,
} = require('../../../utils/response');

// Packages
const bcrypt = require('bcrypt');

// Repository
const UserRepository = require('../../../repository/user.repository');

// Joi
const { userSchema } = require('../../../joi');

const signUpUser = async (req, res) => {
  try {
    let body = userSchema.validate(req.body);
    if (body.error) return unprocessableEntityResponse(res, body.error.message);
    body = body.value;

    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    req.body.password = hashedPassword;

    const [user, errForUser] = await UserRepository.createUser(req.body);
    if (errForUser) return badRequestResponse(res, errForUser);

    return createdSuccessResponse(
      res,
      'Successfully registered new user',
      user
    );
  } catch (err) {
    logger.error(err);
    return serverErrorResponse(res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user, errForUser] = await UserRepository.getUser({ email });
    if (errForUser) return badRequestResponse(res, errForUser);
    if (!user)
      return notFoundResponse(
        res,
        'Invalid email or password. Please try again.'
      );

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken({
        uid: user.uid,
        id: user.id,
        email: user.email,
      });
      const data = { accessToken, ...user.toJSON() };
      return successResponse(res, 'Successfully logged in user', data);
    }
  } catch (err) {
    logger.error(err);
    return serverErrorResponse(res);
  }
};

module.exports = { signUpUser, loginUser };
