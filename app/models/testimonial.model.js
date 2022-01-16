module.exports = (sequelize, Sequelize) => {
  const Testimonial = sequelize.define("testimonial", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    rating: {
      type: Sequelize.INTEGER,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return Testimonial;
};
