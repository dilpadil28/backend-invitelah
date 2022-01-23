"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Theme.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      galleryType: {
        type: DataTypes.STRING,
      },
      fontType1: {
        type: DataTypes.STRING,
      },
      fontType2: {
        type: DataTypes.STRING,
      },
      fontColor1: {
        type: DataTypes.STRING,
      },
      fontColor2: {
        type: DataTypes.STRING,
      },
      backgoundColor: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Theme",
    }
  );
  return Theme;
};
