const db = require("../db/models");
const OrderStep = db.orderStep;
const Op = db.Sequelize.Op;

// Create and Save a new OrderStep
exports.create = (req, res) => {
  // Save OrderStep in the database
  OrderStep.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrderStep.",
      });
    });
};

// Retrieve all OrderSteps from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  OrderStep.findAll({
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
          err.message || "Some error occurred while retrieving orderStep;.",
      });
    });
};

// Find a single OrderStep with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  OrderStep.findOne({
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
          message: `Cannot find OrderStep with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving OrderStep with id=" + id,
      });
    });
};

// Update a OrderStep by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  OrderStep.findOne({
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
            message: "Error updating OrderStep with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update OrderStep with id=${id}. Maybe OrderStep was not found or req.body is empty!`,
      });
    });
};

// Delete a OrderStep with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OrderStep.findOne({
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
            message: `Cannot delete OrderStep with id=${id}. Maybe OrderStep was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete OrderStep with id=" + id,
      });
    });
};

// Delete all OrderSteps from the database.
exports.deleteAll = (req, res) => {
  OrderStep.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} OrderSteps were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.orderStep;.",
      });
    });
};
