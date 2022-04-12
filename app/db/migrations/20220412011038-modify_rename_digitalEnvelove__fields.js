module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("digitalenvelopes", "image", 'atasNama'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("digitalenvelopes", "atasNama", "image");
  },
};
