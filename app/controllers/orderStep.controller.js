const db = require("../models");
const OrderStep = db.orderStep;
const Op = db.Sequelize.Op;

// Create and Save a new OrderStep
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a OrderStep
  const orderStep = {
    title: req.body.title,
    description: req.body.description,
  };

  // Save OrderStep in the database
  OrderStep.create(orderStep)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrderStep.",
      });
    });
};

// Retrieve all Fiturs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  OrderStep.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orderStep.",
      });
    });
};

// Find a single OrderStep with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  OrderStep.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
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

  OrderStep.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "OrderStep was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update OrderStep with id=${id}. Maybe OrderStep was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating OrderStep with id=" + id,
      });
    });
};

// Delete a OrderStep with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OrderStep.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "OrderStep was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete OrderStep with id=${id}. Maybe OrderStep was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete OrderStep with id=" + id,
      });
    });
};

// Delete all Fiturs from the database.
exports.deleteAll = (req, res) => {
  OrderStep.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Fiturs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.orderStep.",
      });
    });
};

// find all published OrderStep
exports.findAllPublished = (req, res) => {
  OrderStep.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving.orderStep.",
      });
    });
};
