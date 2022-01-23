'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LogActivity.init({
    action: DataTypes.STRING,
    description: DataTypes.TEXT,
    ip: DataTypes.STRING,
    hostname: DataTypes.STRING,
    browser: DataTypes.STRING,
    device: DataTypes.STRING,
    mobile: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    type: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'LogActivity',
  });
  return LogActivity;
};