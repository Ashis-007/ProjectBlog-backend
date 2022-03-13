const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const generateAccessToken = (data) => jwt.sign(data, JWT_SECRET);

const verifyAccessToken = (accessToken) => {
  try {
    const data = jwt.verify(accessToken, JWT_SECRET);
    return {
      isVerified: true,
      ...data,
    };
  } catch (err) {
    return {
      isVerified: false,
    };
  }
};

module.exports = { generateAccessToken, verifyAccessToken };
