const db = require("../db/models");
const LogActivity = db.logActivity;
const Op = db.Sequelize.Op;

// Create and Save a new LogActivity
exports.create = (req, res) => {
  // Save LogActivity in the database
  LogActivity.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the LogActivity.",
      });
    });
};

// Retrieve all LogActivitys from the database.
exports.findAll = (req, res) => {
  const action = req.query.action;
  var condition = action ? { action: { [Op.like]: `%${action}%` } } : null;

  LogActivity.findAll({
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
          err.message || "Some error occurred while retrieving logActivity.",
      });
    });
};

// Find a single LogActivity with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  LogActivity.findOne({
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
          message: `Cannot find LogActivity with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving LogActivity with id=" + id,
      });
    });
};

// Update a LogActivity by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  LogActivity.findOne({
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
            message: "Error updating LogActivity with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update LogActivity with id=${id}. Maybe LogActivity was not found or req.body is empty!`,
      });
    });
};

// Delete a LogActivity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  LogActivity.findOne({
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
            message: `Cannot delete LogActivity with id=${id}. Maybe LogActivity was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete LogActivity with id=" + id,
      });
    });
};

// Delete all LogActivitys from the database.
exports.deleteAll = (req, res) => {
  LogActivity.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} LogActivitys were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.logActivity.",
      });
    });
};
