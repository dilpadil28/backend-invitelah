module.exports = (sequelize, Sequelize) => {
  const Themes = sequelize.define("themes", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return Themes;
};
