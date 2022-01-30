"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Statuses",
      [
        {
          name: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Not Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Expired",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("statuses", null, {});
  },
};
