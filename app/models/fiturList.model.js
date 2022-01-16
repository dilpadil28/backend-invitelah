module.exports = (sequelize, Sequelize) => {
  const FiturList = sequelize.define("fiturList", {
    title: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return FiturList;
};
