const { verifyAccessToken } = require('../utils/token');
const { unauthorizedResponse } = require('../utils/response');
const logger = require('../logger');

const userAuth = (req, res, next) => {
  if (req.headers.authorization === undefined) return unauthorizedResponse(res);

  const accessToken = req.headers.authorization.split(' ')[1];
  const { isVerified, ...rest } = verifyAccessToken(accessToken);
  if (isVerified) {
    req.user = { ...rest, accessToken };
    return next();
  }
  logger.error('Invalid access token. Access denied.');
  return unauthorizedResponse(res, 'Invalid access token. Access denied.');
};

module.exports = { userAuth };
