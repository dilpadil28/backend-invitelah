"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("fiturlists", "description", {
      type: Sequelize.STRING,
      after: "title",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("fiturlists", "description");
  },
};
