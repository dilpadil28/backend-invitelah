module.exports = (sequelize, Sequelize) => {
  const PhotoGallery = sequelize.define("photoGallery", {
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });

  return PhotoGallery;
};
