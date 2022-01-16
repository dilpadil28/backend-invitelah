module.exports = (sequelize, Sequelize) => {
  const Background = sequelize.define("background", {
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return Background;
};
