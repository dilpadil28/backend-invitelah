module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("themes", "backgoundColor", 'backgroundColor'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("themes", "backgroundColor", "backgoundColor");
  },
};
