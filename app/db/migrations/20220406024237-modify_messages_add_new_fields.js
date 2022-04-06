'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("messages", "invitationId", {
      type: Sequelize.STRING,
      after: "updatedAt",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("messages", "invitationId");
  },
};
