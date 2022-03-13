const bcrypt = require('bcrypt');

const UserRepository = require('../../../repository/user.repository');
const { SALT_ROUNDS } = require('../../../utils/config');
const { generateAccessToken } = require('../../../utils/token');
const {
  successResponse,
  createdSuccessResponse,
  serverErrorResponse,
  badRequestResponse,
} = require('../../../utils/response');
const logger = require('../../../logger');

const signUpUser = async (req, res) => {
  try {
    if (req.body.password.length < 6) {
      return badRequestResponse(
        res,
        'Password should be atleat 6 characters long'
      );
    }

    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    req.body.password = hashedPassword;

    const [user, err] = await UserRepository.createUser(req.body);
    if (err) return badRequestResponse(res, err);

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

    const [user, err] = await UserRepository.getUser({ email });
    if (err || !user) {
      return badRequestResponse(res, 'Invalid email or password');
    }

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
