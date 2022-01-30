'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      coupon: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      dueDate: {
        type: Sequelize.DATE
      },
      paymentDate: {
        type: Sequelize.DATE
      },
      tax: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      adminFee: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices');
  }
};