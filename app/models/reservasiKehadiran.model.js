module.exports = (sequelize, Sequelize) => {
  const ReservasiKehadiran = sequelize.define("reservasiKehadiran", {
    name: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.TEXT,
    },
    confirmation: {
      type: Sequelize.STRING,
    },
  });

  return ReservasiKehadiran;
};
