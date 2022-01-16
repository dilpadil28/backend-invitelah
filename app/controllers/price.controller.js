const db = require("../models");
const Price = db.price;
const Op = db.Sequelize.Op;

// Create and Save a new Price
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Price
  const price = {
    title: req.body.title,
    description: req.body.description,
    discount: req.body.discount,
    discountTitle: req.body.discountTitle,
    discountDescription: req.body.discountDescription,
    discountExpired: req.body.discountExpired,
  };

  // Save Price in the database
  Price.create(price)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Price.",
      });
    });
};

// Retrieve all Fiturs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Price.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving price.",
      });
    });
};

// Find a single Price with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Price.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Price with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Price with id=" + id,
      });
    });
};

// Update a Price by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Price.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Price was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Price with id=${id}. Maybe Price was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Price with id=" + id,
      });
    });
};

// Delete a Price with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Price.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Price was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Price with id=${id}. Maybe Price was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Price with id=" + id,
      });
    });
};

// Delete all Fiturs from the database.
exports.deleteAll = (req, res) => {
  Price.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Fiturs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all.price.",
      });
    });
};

// find all published Price
exports.findAllPublished = (req, res) => {
  Price.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.price.",
      });
    });
};
