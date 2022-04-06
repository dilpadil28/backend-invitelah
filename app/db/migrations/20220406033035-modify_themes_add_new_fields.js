'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("themes", "backgroundImage", {
      type: Sequelize.STRING,
      after: "backgoundColor",
    },
    );
    await queryInterface.addColumn("themes", "publishProkes", {
      type: Sequelize.BOOLEAN,
      after: "backgroundImage",
    },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("themes", "backgroundImage");
    await queryInterface.removeColumn("themes", "publishProkes");
  },
};
