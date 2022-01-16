module.exports = (sequelize, Sequelize) => {
  const Youtube = sequelize.define("youtube", {
    title: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.TEXT,
    },
  });

  return Youtube;
};
