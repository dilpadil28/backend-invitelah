const db = require("../models");
const Background = db.background;
const Op = db.Sequelize.Op;

// Create and Save a new Background
exports.create = (req, res) => {
  // Create a Background
  const background = {
    name: req.body.name,
    image: req.file.path,
  };

  // Save Background in the database
  Background.create(background)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Background.",
      });
    });
};

// Retrieve all Backgrounds from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Background.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving background.",
      });
    });
};

// Find a single Background with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Background.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Background with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Background with id=" + id,
      });
    });
};

// Update a Background by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Background.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Background was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Background with id=${id}. Maybe Background was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Background with id=" + id,
      });
    });
};

// Delete a Background with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Background.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Background was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Background with id=${id}. Maybe Background was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Background with id=" + id,
      });
    });
};

// Delete all Backgrounds from the database.
exports.deleteAll = (req, res) => {
  Background.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Backgrounds were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.background.",
      });
    });
};

// find all published Background
exports.findAllPublished = (req, res) => {
  Background.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving.background.",
      });
    });
};
