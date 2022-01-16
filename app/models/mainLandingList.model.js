module.exports = (sequelize, Sequelize) => {
  const MainLandingList = sequelize.define("mainLandingList", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return MainLandingList;
};
