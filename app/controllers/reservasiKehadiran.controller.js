const db = require("../models");
const ReservasiKehadiran = db.reservasiKehadiran;
const Op = db.Sequelize.Op;

// Create and Save a new ReservasiKehadiran
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ReservasiKehadiran
  const reservasiKehadiran = {
    name: req.body.name,
    message: req.body.message,
    confirmation: req.body.confirmation,
  };

  // Save ReservasiKehadiran in the database
  ReservasiKehadiran.create(reservasiKehadiran)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the ReservasiKehadiran.",
      });
    });
};

// Retrieve all ReservasiKehadirans from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  ReservasiKehadiran.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving reservasiKehadiran.",
      });
    });
};

// Find a single ReservasiKehadiran with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ReservasiKehadiran.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ReservasiKehadiran with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ReservasiKehadiran with id=" + id,
      });
    });
};

// Update a ReservasiKehadiran by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ReservasiKehadiran.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ReservasiKehadiran was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ReservasiKehadiran with id=${id}. Maybe ReservasiKehadiran was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ReservasiKehadiran with id=" + id,
      });
    });
};

// Delete a ReservasiKehadiran with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ReservasiKehadiran.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ReservasiKehadiran was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ReservasiKehadiran with id=${id}. Maybe ReservasiKehadiran was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ReservasiKehadiran with id=" + id,
      });
    });
};

// Delete all ReservasiKehadirans from the database.
exports.deleteAll = (req, res) => {
  ReservasiKehadiran.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} ReservasiKehadirans were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all.reservasiKehadiran.",
      });
    });
};

// find all published ReservasiKehadiran
exports.findAllPublished = (req, res) => {
  ReservasiKehadiran.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving.reservasiKehadiran.",
      });
    });
};
