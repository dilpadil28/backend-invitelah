const db = require("../db/models");
const Fitur = db.fitur;
const Op = db.Sequelize.Op;

// Create and Save a new Fitur
exports.create = (req, res) => {
  // Save Fitur in the database
  Fitur.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Fitur.",
      });
    });
};

// Retrieve all Fiturs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Fitur.findAll({
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
        message: err.message || "Some error occurred while retrieving fitur.",
      });
    });
};

// Find a single Fitur with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Fitur.findOne({
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
          message: `Cannot find Fitur with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Fitur with id=" + id,
      });
    });
};

// Update a Fitur by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Fitur.findOne({
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
            message: "Error updating Fitur with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Fitur with id=${id}. Maybe Fitur was not found or req.body is empty!`,
      });
    });
};

// Delete a Fitur with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Fitur.findOne({
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
            message: `Cannot delete Fitur with id=${id}. Maybe Fitur was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Fitur with id=" + id,
      });
    });
};

// Delete all Fiturs from the database.
exports.deleteAll = (req, res) => {
  Fitur.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Fiturs were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all.fitur.",
      });
    });
};
