const db = require("../db/models");
const mySocialMedia = db.mySocialMedia;
const Op = db.Sequelize.Op;

// Create and Save a new mySocialMedia
exports.create = (req, res) => {
  // Save mySocialMedia in the database
  mySocialMedia
    .create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the mySocialMedia.",
      });
    });
};

// Retrieve all mySocialMedias from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  mySocialMedia
    .findAll({
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
          err.message || "Some error occurred while retrieving mySocialMedia.",
      });
    });
};

// Find a single mySocialMedia with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  mySocialMedia
    .findOne({
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
          message: `Cannot find mySocialMedia with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving mySocialMedia with id=" + id,
      });
    });
};

// Update a mySocialMedia by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  mySocialMedia
    .findOne({
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    })
    .then((data) => {
      data
        .update(req.body)
        .then(() => {
          res.status(200).send({
            message: "success",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating mySocialMedia with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update mySocialMedia with id=${id}. Maybe mySocialMedia was not found or req.body is empty!`,
      });
    });
};

// Delete a mySocialMedia with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  mySocialMedia
    .findOne({
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
        })
        .catch((err) => {
          res.status(500).send({
            message: `Cannot delete mySocialMedia with id=${id}. Maybe mySocialMedia was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete mySocialMedia with id=" + id,
      });
    });
};

// Delete all mySocialMedias from the database.
exports.deleteAll = (req, res) => {
  mySocialMedia
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({
        message: `${nums} mySocialMedias were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all.mySocialMedia.",
      });
    });
};
