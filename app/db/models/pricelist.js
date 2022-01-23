'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PriceList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PriceList.init({
    label: DataTypes.STRING,
    harga: DataTypes.STRING,
    discountPrice: DataTypes.STRING,
    discountAmount: DataTypes.STRING,
    type: DataTypes.STRING,
    list: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PriceList',
  });
  return PriceList;
};