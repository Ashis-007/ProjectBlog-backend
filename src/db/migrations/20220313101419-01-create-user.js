'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uid: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      first_name: { type: Sequelize.STRING, allowNull: false },
      last_name: { type: Sequelize.STRING, allowNull: false },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
          notNull: 'Hmm...Did you forget the username?',
          notEmpty:
            "Couldn't you think a username for you? Maybe we'll think of a beautiful one for you.",
        },
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        validate: {
          notNull:
            'Please tell us your email. We promise not to send any spams 🥺',
          notEmpty:
            'Please tell us your email. We promise not to send any spams 🥺',
          isEmail: 'Wait. Is that even a valid email? 🤔',
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: 'Password is required sir/madam.',
          notEmpty: 'Wait a second, how can the password field be left empty?',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  },
};
