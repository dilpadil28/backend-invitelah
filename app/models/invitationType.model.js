module.exports = (sequelize, Sequelize) => {
  const InvitationType = sequelize.define("invitationType", {
    name: {
      type: Sequelize.STRING,
    },
  });

  return InvitationType;
};
