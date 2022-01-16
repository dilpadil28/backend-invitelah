module.exports = (sequelize, Sequelize) => {
  const Fitur = sequelize.define("fitur", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return Fitur;
};
