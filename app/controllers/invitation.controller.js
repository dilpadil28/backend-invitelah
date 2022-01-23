const db = require("../models");
const Invitation = db.invitation;
const Op = db.Sequelize.Op;

// Create and Save a new Invitation
exports.create = (req, res) => {
  // Save Invitation in the database
  Invitation.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Invitation.",
      });
    });
};

// Retrieve all Invitations from the database.
exports.findAll = (req, res) => {
  const slug = req.query.slug;
  var condition = slug ? { slug: { [Op.like]: `%${slug}%` } } : null;

  Invitation.findAll({
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
          err.message || "Some error occurred while retrieving invitation.",
      });
    });
};

// Find a single Invitation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Invitation.findOne({
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
          message: `Cannot find Invitation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Invitation with id=" + id,
      });
    });
};

// Update a Invitation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Invitation.findOne({
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
            message: "Error updating Invitation with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Invitation with id=${id}. Maybe Invitation was not found or req.body is empty!`,
      });
    });
};

// Delete a Invitation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Invitation.findOne({
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
            message: `Cannot delete Invitation with id=${id}. Maybe Invitation was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Invitation with id=" + id,
      });
    });
};

// Delete all Invitations from the database.
exports.deleteAll = (req, res) => {
  Invitation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Invitations were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.invitation.",
      });
    });
};
