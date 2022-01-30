const db = require("../db/models");
const Coupon = db.coupon;
const Op = db.Sequelize.Op;

// Create and Save a new Coupon
exports.create = (req, res) => {
  // Save Coupon in the database
  Coupon.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Coupon.",
      });
    });
};

// Retrieve all Coupons from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Coupon.findAll({
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
        message: err.message || "Some error occurred while retrieving coupon.",
      });
    });
};

// Find a single Coupon with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Coupon.findOne({
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
          message: `Cannot find Coupon with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Coupon with id=" + id,
      });
    });
};

// Update a Coupon by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Coupon.findOne({
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
            message: "Error updating Coupon with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Coupon with id=${id}. Maybe Coupon was not found or req.body is empty!`,
      });
    });
};

// Delete a Coupon with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Coupon.findOne({
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
            message: `Cannot delete Coupon with id=${id}. Maybe Coupon was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Coupon with id=" + id,
      });
    });
};

// Delete all Coupons from the database.
exports.deleteAll = (req, res) => {
  Coupon.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Coupons were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.coupon.",
      });
    });
};
