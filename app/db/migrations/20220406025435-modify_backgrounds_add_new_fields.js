'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("backgrounds", "published", {
      type: Sequelize.BOOLEAN,
      after: "image",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("backgrounds", "published");
  },
};
