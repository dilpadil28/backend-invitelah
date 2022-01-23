const db = require("../db/models");
const Price = db.price;
const Op = db.Sequelize.Op;

// Create and Save a new Price
exports.create = (req, res) => {
  // Save Price in the database
  Price.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Price.",
      });
    });
};

// Retrieve all Prices from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Price.findAll({
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
        message: err.message || "Some error occurred while retrieving price;.",
      });
    });
};

// Find a single Price with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Price.findOne({
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
  Price.findOne({
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
            message: "Error updating Price with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Price with id=${id}. Maybe Price was not found or req.body is empty!`,
      });
    });
};

// Delete a Price with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Price.findOne({
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
            message: `Cannot delete Price with id=${id}. Maybe Price was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Price with id=" + id,
      });
    });
};

// Delete all Prices from the database.
exports.deleteAll = (req, res) => {
  Price.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Prices were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.price;.",
      });
    });
};
