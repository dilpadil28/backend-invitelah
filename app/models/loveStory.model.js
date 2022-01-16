module.exports = (sequelize, Sequelize) => {
  const LoveStory = sequelize.define("loveStory", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    date: {
      type: Sequelize.STRING,
    },
  });

  return LoveStory;
};
