"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invitations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      slug: {
        type: Sequelize.STRING,
      },
      namaPria: {
        type: Sequelize.STRING,
      },
      namaPendekPria: {
        type: Sequelize.STRING,
      },
      namaOrangTuaPria: {
        type: Sequelize.STRING,
      },
      namaWanita: {
        type: Sequelize.STRING,
      },
      namaPendekWanita: {
        type: Sequelize.STRING,
      },
      namaOrangTuaWanita: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      alamatKado: {
        type: Sequelize.TEXT,
      },
      tanggalNikah: {
        type: Sequelize.STRING,
      },
      jamNikah: {
        type: Sequelize.STRING,
      },
      alamatNikah: {
        type: Sequelize.TEXT,
      },
      mapsNikah: {
        type: Sequelize.TEXT,
      },
      tanggalResepsi: {
        type: Sequelize.STRING,
      },
      jamResepsi: {
        type: Sequelize.STRING,
      },
      alamatResepsi: {
        type: Sequelize.TEXT,
      },
      mapsResepsi: {
        type: Sequelize.TEXT,
      },
      bissmillah: {
        type: Sequelize.BOOLEAN,
      },
      salamPembuka: {
        type: Sequelize.STRING,
      },
      salamPembukaDeskripsi: {
        type: Sequelize.TEXT,
      },
      salamPenutup: {
        type: Sequelize.STRING,
      },
      salamPenutupDeskripsi: {
        type: Sequelize.TEXT,
      },
      doa: {
        type: Sequelize.TEXT,
      },
      turutMengundang: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Invitations");
  },
};
