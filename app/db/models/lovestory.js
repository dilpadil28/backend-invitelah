"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LoveStory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LoveStory.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      date: DataTypes.STRING,
      published: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "LoveStory",
    }
  );
  return LoveStory;
};
