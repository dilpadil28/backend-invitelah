module.exports = (sequelize, Sequelize) => {
  const ProkesList = sequelize.define("prokesList", {
    title: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return ProkesList;
};
