"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invitation.init(
    {
      slug: {
        type: DataTypes.STRING,
      },
      namaPria: {
        type: DataTypes.STRING,
      },
      namaPendekPria: {
        type: DataTypes.STRING,
      },
      namaOrangTuaPria: {
        type: DataTypes.STRING,
      },
      namaWanita: {
        type: DataTypes.STRING,
      },
      namaPendekWanita: {
        type: DataTypes.STRING,
      },
      namaOrangTuaWanita: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      alamatKado: {
        type: DataTypes.TEXT,
      },
      tanggalNikah: {
        type: DataTypes.STRING,
      },
      jamNikah: {
        type: DataTypes.STRING,
      },
      alamatNikah: {
        type: DataTypes.TEXT,
      },
      mapsNikah: {
        type: DataTypes.TEXT,
      },
      tanggalResepsi: {
        type: DataTypes.STRING,
      },
      jamResepsi: {
        type: DataTypes.STRING,
      },
      alamatResepsi: {
        type: DataTypes.TEXT,
      },
      mapsResepsi: {
        type: DataTypes.TEXT,
      },
      bissmillah: {
        type: DataTypes.BOOLEAN,
      },
      salamPembuka: {
        type: DataTypes.STRING,
      },
      salamPembukaDeskripsi: {
        type: DataTypes.TEXT,
      },
      salamPenutup: {
        type: DataTypes.STRING,
      },
      salamPenutupDeskripsi: {
        type: DataTypes.TEXT,
      },
      doa: {
        type: DataTypes.TEXT,
      },
      turutMengundang: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Invitation",
    }
  );
  return Invitation;
};
