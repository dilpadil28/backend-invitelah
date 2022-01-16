const db = require("../models");
const InvitationType = db.invitationType;
const Op = db.Sequelize.Op;

// Create and Save a new InvitationType
exports.create = (req, res) => {
  // Create a InvitationType
  const invitationType = {
    name: req.body.name,
  };

  // Save InvitationType in the database
  InvitationType.create(invitationType)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the InvitationType.",
      });
    });
};

// Retrieve all Fiturs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  InvitationType.findAll({ where: condition })
    .then((data) => {
      res.send(data);
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

  InvitationType.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
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

  InvitationType.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "InvitationType was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update InvitationType with id=${id}. Maybe InvitationType was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating InvitationType with id=" + id,
      });
    });
};

// Delete a InvitationType with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  InvitationType.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "InvitationType was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete InvitationType with id=${id}. Maybe InvitationType was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete InvitationType with id=" + id,
      });
    });
};

// Delete all Fiturs from the database.
exports.deleteAll = (req, res) => {
  InvitationType.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Fiturs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all.invitationType.",
      });
    });
};

// find all published InvitationType
exports.findAllPublished = (req, res) => {
  InvitationType.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving.invitationType.",
      });
    });
};
