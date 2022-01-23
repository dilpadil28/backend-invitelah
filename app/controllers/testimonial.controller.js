const db = require("../db/models");
const Background = db.background;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new Background
exports.create = (req, res) => {
  // Create a Background
  const background = {
    name: req.body.name,
    descrtiption: req.body.descrtiption,
    rating: req.body.rating,
    image: req.file === undefined ? "" : req.file.path,
  };

  // Save Background in the database
  Background.create(background)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
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

  Background.findAll({
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
          err.message || "Some error occurred while retrieving background.",
      });
    });
};

// Find a single Background with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Background.findOne({
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
  Background.findOne({
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
          name: req.body.name,
          descrtiption: req.body.descrtiption,
          rating: req.body.rating,
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
            message: "Error updating Background with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Background with id=${id}. Maybe Background was not found or req.body is empty!`,
      });
    });
};

// Delete a Background with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Background.findOne({
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
            message: `Cannot delete Background with id=${id}. Maybe Background was not found!`,
          });
        });
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
