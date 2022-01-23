"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "InvitationTypes",
      [
        {
          name: "nikah",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "tunangan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ulang tahun",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "khitan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "rapat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "upacara",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "pelantikan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "custom",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("InvitationTypes", null, {});
  },
};
