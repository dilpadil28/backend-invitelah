'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("themes", "cardColor", {
      type: Sequelize.STRING,
      after: "backgroundImage",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("themes", "cardColor");
  },
};
