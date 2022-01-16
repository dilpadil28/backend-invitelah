module.exports = (sequelize, Sequelize) => {
  const FiturList = sequelize.define("fiturList", {
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.TEXT,
    },
  });

  return FiturList;
};
