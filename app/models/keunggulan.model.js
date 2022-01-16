module.exports = (sequelize, Sequelize) => {
  const Keunggulan = sequelize.define("keunggulan", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return Keunggulan;
};
