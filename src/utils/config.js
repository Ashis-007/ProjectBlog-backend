module.exports = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  JWT_SECRET: process.env.JWT_SECRET,
};
