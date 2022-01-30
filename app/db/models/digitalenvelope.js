"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DigitalEnvelope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DigitalEnvelope.init(
    {
      name: DataTypes.STRING,
      number: DataTypes.STRING,
      published: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DigitalEnvelope",
    }
  );
  return DigitalEnvelope;
};
