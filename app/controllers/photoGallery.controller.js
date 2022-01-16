const db = require("../models");
const PhotoGallery = db.photoGallery;
const Op = db.Sequelize.Op;

// Create and Save a new PhotoGallery
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a PhotoGallery
  const photoGallery = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  };

  // Save PhotoGallery in the database
  PhotoGallery.create(photoGallery)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PhotoGallery.",
      });
    });
};

// Retrieve all Fiturs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  PhotoGallery.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving photoGallery.",
      });
    });
};

// Find a single PhotoGallery with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PhotoGallery.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PhotoGallery with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PhotoGallery with id=" + id,
      });
    });
};

// Update a PhotoGallery by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PhotoGallery.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PhotoGallery was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update PhotoGallery with id=${id}. Maybe PhotoGallery was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PhotoGallery with id=" + id,
      });
    });
};

// Delete a PhotoGallery with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PhotoGallery.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PhotoGallery was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete PhotoGallery with id=${id}. Maybe PhotoGallery was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PhotoGallery with id=" + id,
      });
    });
};

// Delete all Fiturs from the database.
exports.deleteAll = (req, res) => {
  PhotoGallery.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Fiturs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.photoGallery.",
      });
    });
};

// find all published PhotoGallery
exports.findAllPublished = (req, res) => {
  PhotoGallery.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving.photoGallery.",
      });
    });
};
