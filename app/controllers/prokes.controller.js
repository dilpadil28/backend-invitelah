const db = require("../models");
const Prokes = db.prokes;
const Op = db.Sequelize.Op;

// Create and Save a new Prokes
exports.create = (req, res) => {
  // Save Prokes in the database
  Prokes.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
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
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Prokes.findAll({
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
        message: err.message || "Some error occurred while retrieving prokes;.",
      });
    });
};

// Find a single Prokes with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Prokes.findOne({
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
  Prokes.findOne({
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
            message: "Error updating Prokes with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Prokes with id=${id}. Maybe Prokes was not found or req.body is empty!`,
      });
    });
};

// Delete a Prokes with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Prokes.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      console.log("data", data.image);
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
            message: `Cannot delete Prokes with id=${id}. Maybe Prokes was not found!`,
          });
        });
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
      res.send({
        message: `${nums} Prokess were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.prokes;.",
      });
    });
};
