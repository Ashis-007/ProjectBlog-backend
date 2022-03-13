'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate({ Article }) {
      // define association here
      this.hasMany(Article, {});
    }
    toJSON() {
      return { ...this.get(), id: undefined, password: undefined };
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
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
