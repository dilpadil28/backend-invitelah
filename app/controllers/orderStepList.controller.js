const db = require("../db/models");
const OrderStepList = db.orderStepList;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new OrderStepList
exports.create = (req, res) => {
  // Create a OrderStepList
  const orderStepList = {
    title: req.body.title,
    image: req.file === undefined ? "" : req.file.filename,
    orderStepId: req.body.orderStepId,
  };

  // Save OrderStepList in the database
  OrderStepList.create(orderStepList)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the OrderStepList.",
      });
    });
};

// Retrieve all OrderStepLists from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  OrderStepList.findAll({
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
          err.message || "Some error occurred while retrieving orderStepList.",
      });
    });
};

// Find a single OrderStepList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  OrderStepList.findOne({
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
          message: `Cannot find OrderStepList with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving OrderStepList with id=" + id,
      });
    });
};

// Update a OrderStepList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  OrderStepList.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      if (req.file !== undefined && data.image !== "") {
        fs.unlink("./upload/images/" + data.image, (err) => {
          if (err) throw err;
        });
      }
      data
        .update({
          title: req.body.title,
          image: req.file === undefined ? data.image : req.file.filename,
        })
        .then(() => {
          res.status(200).send({
            message: "success",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating OrderStepList with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update OrderStepList with id=${id}. Maybe OrderStepList was not found or req.body is empty!`,
      });
    });
};

// Delete a OrderStepList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OrderStepList.findOne({
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
          if (data.image !== "") {
            fs.unlink("./upload/images/" + data.image, (err) => {
              if (err) throw err;
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: `Cannot delete OrderStepList with id=${id}. Maybe OrderStepList was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete OrderStepList with id=" + id,
      });
    });
};

// Delete all OrderStepLists from the database.
exports.deleteAll = (req, res) => {
  OrderStepList.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} OrderStepLists were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all.orderStepList.",
      });
    });
};
