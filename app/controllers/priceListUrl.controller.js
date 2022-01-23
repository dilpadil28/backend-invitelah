const db = require("../db/models");
const PriceListUrl = db.priceListUrl;
const Op = db.Sequelize.Op;

// Create and Save a new PriceListUrl
exports.create = (req, res) => {
  // Save PriceListUrl in the database
  PriceListUrl.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PriceListUrl.",
      });
    });
};

// Retrieve all Prices from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  PriceListUrl.findAll({
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
          err.message || "Some error occurred while retrieving priceListUrl;.",
      });
    });
};

// Find a single PriceListUrl with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PriceListUrl.findOne({
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
          message: `Cannot find PriceListUrl with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PriceListUrl with id=" + id,
      });
    });
};

// Update a PriceListUrl by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  PriceListUrl.findOne({
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
            message: "Error updating PriceListUrl with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update PriceListUrl with id=${id}. Maybe PriceListUrl was not found or req.body is empty!`,
      });
    });
};

// Delete a PriceListUrl with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PriceListUrl.findOne({
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
            message: `Cannot delete PriceListUrl with id=${id}. Maybe PriceListUrl was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PriceListUrl with id=" + id,
      });
    });
};

// Delete all Prices from the database.
exports.deleteAll = (req, res) => {
  PriceListUrl.destroy({
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
          err.message ||
          "Some error occurred while removing all.priceListUrl;.",
      });
    });
};
