'use strict';

const { Model } = require('sequelize');
const { Sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: 'Hmm...Did you forget the username?',
          notEmpty:
            "Couldn't you think a username for you? Maybe we'll think of a beautiful one for you.",
        },
      },
      email: {
        type: DataTypes.STRING(40),
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: 'Password is required sir/madam.',
          notEmpty: 'Wait a second, how can the password field be left empty?',
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return user;
};
