const db = require("../db/models");
const Presence = db.presence;
const Op = db.Sequelize.Op;

// Create and Save a new Presence
exports.create = (req, res) => {
  // Save Presence in the database
  Presence.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Presence.",
      });
    });
};

// Retrieve all Presences from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Presence.findAll({
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
          err.message || "Some error occurred while retrieving presence;.",
      });
    });
};

// Find a single Presence with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Presence.findOne({
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
          message: `Cannot find Presence with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Presence with id=" + id,
      });
    });
};

// Update a Presence by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Presence.findOne({
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
            message: "Error updating Presence with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Presence with id=${id}. Maybe Presence was not found or req.body is empty!`,
      });
    });
};

// Delete a Presence with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Presence.findOne({
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
            message: `Cannot delete Presence with id=${id}. Maybe Presence was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Presence with id=" + id,
      });
    });
};

// Delete all Presences from the database.
exports.deleteAll = (req, res) => {
  Presence.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Presences were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.presence;.",
      });
    });
};
