const db = require("../models");
const DigitalEnvelope = db.digitalEnvelope;
const Op = db.Sequelize.Op;

// Create and Save a new DigitalEnvelope
exports.create = (req, res) => {
  // Create a DigitalEnvelope
  const digitalEnvelope = {
    name: req.body.name,
    number: req.body.number,
  };

  // Save DigitalEnvelope in the database
  DigitalEnvelope.create(digitalEnvelope)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the DigitalEnvelope.",
      });
    });
};

// Retrieve all Backgrounds from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  DigitalEnvelope.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving digitalEnvelope.",
      });
    });
};

// Find a single DigitalEnvelope with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DigitalEnvelope.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find DigitalEnvelope with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving DigitalEnvelope with id=" + id,
      });
    });
};

// Update a DigitalEnvelope by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DigitalEnvelope.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "DigitalEnvelope was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update DigitalEnvelope with id=${id}. Maybe DigitalEnvelope was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating DigitalEnvelope with id=" + id,
      });
    });
};

// Delete a DigitalEnvelope with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DigitalEnvelope.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "DigitalEnvelope was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete DigitalEnvelope with id=${id}. Maybe DigitalEnvelope was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete DigitalEnvelope with id=" + id,
      });
    });
};

// Delete all Backgrounds from the database.
exports.deleteAll = (req, res) => {
  DigitalEnvelope.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Backgrounds were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all.digitalEnvelope.",
      });
    });
};

// find all published DigitalEnvelope
exports.findAllPublished = (req, res) => {
  DigitalEnvelope.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving.digitalEnvelope.",
      });
    });
};
