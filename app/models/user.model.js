module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    fullName: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumberVerifiedAt: {
      type: Sequelize.DATE,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    emailVerifiedAt: {
      type: Sequelize.DATE,
    },
    password: {
      type: Sequelize.STRING,
    },
    passwordChangeAt: {
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  });

  return User;
};
