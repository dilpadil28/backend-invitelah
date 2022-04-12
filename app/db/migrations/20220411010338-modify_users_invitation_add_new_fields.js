'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("invitations", "avatarPria", {
      type: Sequelize.STRING,
      after: "slug",
    },
    );
    await queryInterface.addColumn("invitations", "avatarWanita", {
      type: Sequelize.STRING,
      after: "namaOrangTuaPria",
    },
    );
    await queryInterface.renameColumn("invitations", "avatar", 'avatarPasangan'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("invitations", "avatarPria");
    await queryInterface.removeColumn("invitations", "avatarWanita");
    await queryInterface.renameColumn("invitations", "avatarPasangan", 'avatar'
    );
  },
};
