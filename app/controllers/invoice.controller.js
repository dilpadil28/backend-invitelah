const db = require("../db/models");
const Invoice = db.invoice;
const Op = db.Sequelize.Op;

// Create and Save a new Invoice
exports.create = (req, res) => {
  // Save Invoice in the database
  Invoice.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Invoice.",
      });
    });
};

// Retrieve all Invoices from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Invoice.findAll({
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
        message: err.message || "Some error occurred while retrieving invoice.",
      });
    });
};

// Find a single Invoice with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Invoice.findOne({
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
          message: `Cannot find Invoice with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Invoice with id=" + id,
      });
    });
};

// Update a Invoice by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Invoice.findOne({
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
            message: "Error updating Invoice with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Invoice with id=${id}. Maybe Invoice was not found or req.body is empty!`,
      });
    });
};

// Delete a Invoice with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Invoice.findOne({
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
            message: `Cannot delete Invoice with id=${id}. Maybe Invoice was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Invoice with id=" + id,
      });
    });
};

// Delete all Invoices from the database.
exports.deleteAll = (req, res) => {
  Invoice.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Invoices were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.invoice.",
      });
    });
};
