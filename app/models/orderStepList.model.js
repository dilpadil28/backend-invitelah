module.exports = (sequelize, Sequelize) => {
  const OrderStepList = sequelize.define("orderStepList", {
    title: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return OrderStepList;
};
