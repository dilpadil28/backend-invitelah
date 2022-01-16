const db = require("../models");
const Prokes = db.prokes;
const Op = db.Sequelize.Op;

// Create and Save a new Prokes
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Prokes
  const prokes = {
    title: req.body.title,
    description: req.body.description,
  };

  // Save Prokes in the database
  Prokes.create(prokes)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Prokes.",
      });
    });
};

// Retrieve all Prokess from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { name: { [Op.like]: `%${name}%` } } : null;

  Prokes.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving prokes.",
      });
    });
};

// Find a single Prokes with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Prokes.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Prokes with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Prokes with id=" + id,
      });
    });
};

// Update a Prokes by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Prokes.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Prokes was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Prokes with id=${id}. Maybe Prokes was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Prokes with id=" + id,
      });
    });
};

// Delete a Prokes with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Prokes.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Prokes was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Prokes with id=${id}. Maybe Prokes was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Prokes with id=" + id,
      });
    });
};

// Delete all Prokess from the database.
exports.deleteAll = (req, res) => {
  Prokes.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Prokess were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.prokes.",
      });
    });
};

// find all published Prokes
exports.findAllPublished = (req, res) => {
  Prokes.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.prokes.",
      });
    });
};
