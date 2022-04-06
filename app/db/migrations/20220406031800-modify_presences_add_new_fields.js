'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("presences", "phoneNumber", {
      type: Sequelize.STRING,
      after: "confirmation",
    },
    );
    await queryInterface.addColumn("presences", "total", {
      type: Sequelize.STRING,
      after: "phoneNumber",
    },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("presences", "phoneNumber");
    await queryInterface.removeColumn("presences", "total");
  },
};
