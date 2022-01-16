module.exports = (sequelize, Sequelize) => {
  const Price = sequelize.define("price", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    discount: {
      type: Sequelize.STRING,
    },
    discountTitle: {
      type: Sequelize.STRING,
    },
    discountDescription: {
      type: Sequelize.TEXT,
    },
    discountExpired: {
      type: Sequelize.DATE,
    },
  });

  return Price;
};
