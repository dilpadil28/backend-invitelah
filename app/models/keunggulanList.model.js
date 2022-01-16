module.exports = (sequelize, Sequelize) => {
  const KeunggulanList = sequelize.define("keunggulanList", {
    title: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return KeunggulanList;
};
