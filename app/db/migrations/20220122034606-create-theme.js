"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Themes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      galleryType: {
        type: Sequelize.STRING,
      },
      fontType1: {
        type: Sequelize.STRING,
      },
      fontType2: {
        type: Sequelize.STRING,
      },
      fontColor1: {
        type: Sequelize.STRING,
      },
      fontColor2: {
        type: Sequelize.STRING,
      },
      backgoundColor: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Themes");
  },
};
