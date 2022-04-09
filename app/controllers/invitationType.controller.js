const db = require("../db/models");
const Transaction = db.transaction;
const Op = db.Sequelize.Op;

// Create and Save a new Transaction
exports.create = (req, res) => {
  // Save Transaction in the database
  Transaction.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction.",
      });
    });
};

// Retrieve all Transactions from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Transaction.findAll({
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
          err.message || "Some error occurred while retrieving transaction.",
      });
    });
};

// Find a single Transaction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Transaction.findOne({
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
          message: `Cannot find Transaction with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Transaction with id=" + id,
      });
    });
};

// Update a Transaction by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Transaction.findOne({
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
            message: "Error updating Transaction with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Transaction with id=${id}. Maybe Transaction was not found or req.body is empty!`,
      });
    });
};

// Delete a Transaction with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Transaction.findOne({
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
            message: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Transaction with id=" + id,
      });
    });
};

// Delete all Transactions from the database.
exports.deleteAll = (req, res) => {
  Transaction.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Transactions were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.transaction.",
      });
    });
};
