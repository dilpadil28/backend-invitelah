const db = require("../db/models");
const PhotoGallery = db.photoGallery;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new PhotoGallery
exports.create = (req, res) => {
  // Create a PhotoGallery
  const photoGallery = {
    title: req.body.title,
    image: req.file === undefined ? "" : req.file.path,
    descrtiption: req.body.descrtiption,
    invitationId: req.body.invitationId,
  };

  // Save PhotoGallery in the database
  PhotoGallery.create(photoGallery)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PhotoGallery.",
      });
    });
};

// Retrieve all PhotoGallerys from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  PhotoGallery.findAll({
    where: condition,
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      res.status(200).json({
        message: "success",
        data: data,
      });
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

  PhotoGallery.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "success",
          data: data,
        });
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
  PhotoGallery.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      if (req.file !== undefined) {
        fs.unlink(data.image, (err) => {
          if (err) throw err;
        });
      }
      data
        .update({
          title: req.body.title,
          image: req.file === undefined ? data.image : req.file.path,
        })
        .then(() => {
          res.status(200).send({
            message: "success",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating PhotoGallery with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update PhotoGallery with id=${id}. Maybe PhotoGallery was not found or req.body is empty!`,
      });
    });
};

// Delete a PhotoGallery with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PhotoGallery.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      data
        .destroy()
        .then(() => {
          res.status(200).send({
            message: "success",
            data: data,
          });
          fs.unlink(data.image, (err) => {
            if (err) throw err;
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: `Cannot delete PhotoGallery with id=${id}. Maybe PhotoGallery was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PhotoGallery with id=" + id,
      });
    });
};

// Delete all PhotoGallerys from the database.
exports.deleteAll = (req, res) => {
  PhotoGallery.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} PhotoGallerys were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.photoGallery.",
      });
    });
};
