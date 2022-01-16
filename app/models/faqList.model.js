module.exports = (sequelize, Sequelize) => {
  const FaqList = sequelize.define("faqList", {
    question: {
      type: Sequelize.STRING,
    },
    answer: {
      type: Sequelize.TEXT,
    },
  });

  return FaqList;
};
