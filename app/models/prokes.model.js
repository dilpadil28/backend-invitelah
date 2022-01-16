module.exports = (sequelize, Sequelize) => {
  const Prokes = sequelize.define("prokes", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return Prokes;
};
