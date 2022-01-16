module.exports = (sequelize, Sequelize) => {
  const Invitation = sequelize.define("invitation", {
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
    namaTema: {
      type: Sequelize.STRING,
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
    tipeGaleri: {
      type: Sequelize.TEXT,
    },
    backgroundModal: {
      type: Sequelize.STRING,
    },
    turutMengundang: {
      type: Sequelize.TEXT,
    },
  });

  return Invitation;
};
