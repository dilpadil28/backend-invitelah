module.exports = (sequelize, Sequelize) => {
  const MySocialMedia = sequelize.define("mySocialMedia", {
    name: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.TEXT,
    },
  });

  return MySocialMedia;
};
