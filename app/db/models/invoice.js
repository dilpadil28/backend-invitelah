'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init({
    code: DataTypes.STRING,
    amount: DataTypes.STRING,
    coupon: DataTypes.STRING,
    date: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    paymentDate: DataTypes.DATE,
    tax: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    adminFee: DataTypes.STRING,
    total: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};