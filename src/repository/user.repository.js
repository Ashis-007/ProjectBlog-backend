const logger = require('../logger');

const { User } = require('../db/models');

const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    console.log(newUser.toJSON());
    return [newUser, null];
  } catch (err) {
    logger.error(err);
    return [null, err.message];
  }
};

const getUser = async (query) => {
  try {
    const user = await User.findOne({ where: query });
    return [user.toJSON(), null];
  } catch (err) {
    logger.error(err);
    return [null, err.message];
  }
};

module.exports = { createUser, getUser };
