const db = require("../db/models");
const InvitationType = db.invitationType;
const Op = db.Sequelize.Op;

// Create and Save a new InvitationType
exports.create = (req, res) => {
  // Save InvitationType in the database
  InvitationType.create(req.body)
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
          "Some error occurred while creating the InvitationType.",
      });
    });
};

// Retrieve all InvitationTypes from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  InvitationType.findAll({
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
          err.message || "Some error occurred while retrieving invitationType.",
      });
    });
};

// Find a single InvitationType with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  InvitationType.findOne({
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
          message: `Cannot find InvitationType with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving InvitationType with id=" + id,
      });
    });
};

// Update a InvitationType by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  InvitationType.findOne({
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
            message: "Error updating InvitationType with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update InvitationType with id=${id}. Maybe InvitationType was not found or req.body is empty!`,
      });
    });
};

// Delete a InvitationType with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  InvitationType.findOne({
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
            message: `Cannot delete InvitationType with id=${id}. Maybe InvitationType was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete InvitationType with id=" + id,
      });
    });
};

// Delete all InvitationTypes from the database.
exports.deleteAll = (req, res) => {
  InvitationType.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} InvitationTypes were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all.invitationType.",
      });
    });
};
