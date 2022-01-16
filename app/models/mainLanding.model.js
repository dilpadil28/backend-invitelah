module.exports = (sequelize, Sequelize) => {
  const MainLanding = sequelize.define("mainLanding", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return MainLanding;
};
