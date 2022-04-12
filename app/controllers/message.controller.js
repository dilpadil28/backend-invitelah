const db = require("../db/models");
const Message = db.message;
const Op = db.Sequelize.Op;

// Create and Save a new Message
exports.create = (req, res) => {
  // Save Message in the database
  Message.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};

// Retrieve all Messages from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Message.findAll({
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
        message: err.message || "Some error occurred while retrieving message.",
      });
    });
};

// Find a single Message with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Message.findOne({
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
          message: `Cannot find Message with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Message with id=" + id,
      });
    });
};

exports.findByInvitationId = (req, res) => {
  const id = req.params.id;

  Message.findAll({
    where: { invitationId: id },
    order: [["id", "DESC"]],
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
          message: `Cannot find Message with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Message with id=" + id,
      });
    });
};

// Update a Message by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Message.findOne({
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
            message: "Error updating Message with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Message with id=${id}. Maybe Message was not found or req.body is empty!`,
      });
    });
};

// Delete a Message with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Message.findOne({
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
        })
        .catch((err) => {
          res.status(500).send({
            message: `Cannot delete Message with id=${id}. Maybe Message was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Message with id=" + id,
      });
    });
};

// Delete all Messages from the database.
exports.deleteAll = (req, res) => {
  Message.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Messages were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.message.",
      });
    });
};
