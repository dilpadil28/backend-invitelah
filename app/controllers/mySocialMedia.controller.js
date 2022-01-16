const db = require("../models");
const MySocialMedia = db.mySocialMedia;
const Op = db.Sequelize.Op;

// Create and Save a new MySocialMedia
exports.create = (req, res) => {
  // Create a MySocialMedia
  const mySocialMedia = {
    name: req.body.name,
    url: req.body.url,
  };

  // Save MySocialMedia in the database
  MySocialMedia.create(mySocialMedia)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the MySocialMedia.",
      });
    });
};

// Retrieve all Fiturs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  MySocialMedia.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mySocialMedia.",
      });
    });
};

// Find a single MySocialMedia with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MySocialMedia.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find MySocialMedia with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving MySocialMedia with id=" + id,
      });
    });
};

// Update a MySocialMedia by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  MySocialMedia.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "MySocialMedia was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update MySocialMedia with id=${id}. Maybe MySocialMedia was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating MySocialMedia with id=" + id,
      });
    });
};

// Delete a MySocialMedia with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  MySocialMedia.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "MySocialMedia was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete MySocialMedia with id=${id}. Maybe MySocialMedia was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete MySocialMedia with id=" + id,
      });
    });
};

// Delete all Fiturs from the database.
exports.deleteAll = (req, res) => {
  MySocialMedia.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Fiturs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all.mySocialMedia.",
      });
    });
};

// find all published MySocialMedia
exports.findAllPublished = (req, res) => {
  MySocialMedia.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving.mySocialMedia.",
      });
    });
};
