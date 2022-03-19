'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: {
          name: 'user_id',
          allowNull: false,
        },
      });
    }

    toJSON() {
      return { ...this.get(), user_id: undefined };
    }
  }
  article.init(
    {
      article_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      likes: { type: DataTypes.INTEGER, defaultValue: 0 },
      views: { type: DataTypes.INTEGER, defaultValue: 0 },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: 'Article must have an user_id.',
        },
      },
    },
    {
      sequelize,
      modelName: 'Article',
      tableName: 'article',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return article;
};
