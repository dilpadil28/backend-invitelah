module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("messages", {
    name: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.TEXT,
    },
  });

  return Message;
};
