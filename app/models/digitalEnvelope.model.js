module.exports = (sequelize, Sequelize) => {
  const DigitalEnvelope = sequelize.define("digitalEnvelope", {
    name: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
  });

  return DigitalEnvelope;
};
