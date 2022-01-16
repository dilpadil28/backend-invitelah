module.exports = (sequelize, Sequelize) => {
  const PriceListUrl = sequelize.define("priceListUrl", {
    name: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.TEXT,
    },
  });

  return PriceListUrl;
};
