module.exports = (sequelize, Sequelize) => {
  const OrderStep = sequelize.define("oderStep", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return OrderStep;
};
