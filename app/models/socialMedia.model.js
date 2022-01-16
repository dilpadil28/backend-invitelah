module.exports = (sequelize, Sequelize) => {
  const SocialMedia = sequelize.define("socialMedia", {
    name: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.TEXT,
    },
  });

  return SocialMedia;
};
