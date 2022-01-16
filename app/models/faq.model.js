module.exports = (sequelize, Sequelize) => {
  const Faq = sequelize.define("faq", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return Faq;
};
