module.exports = (sequelize, Sequelize) => {
  const PriceList = sequelize.define("priceList", {
    label: {
      type: Sequelize.STRING,
    },
    harga: {
      type: Sequelize.STRING,
    },
    discountPrice: {
      type: Sequelize.STRING,
    },
    discountAmount: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    list: {
      type: Sequelize.TEXT,
    },
  });

  return PriceList;
};
