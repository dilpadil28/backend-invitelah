const db = require("../db/models");
const Theme = db.theme;
const Op = db.Sequelize.Op;

// Create and Save a new Theme
exports.create = (req, res) => {
  // Save Theme in the database
  Theme.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Theme.",
      });
    });
};

// Retrieve all Themes from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Theme.findAll({
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
        message: err.message || "Some error occurred while retrieving theme.",
      });
    });
};

// Find a single Theme with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Theme.findOne({
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
          message: `Cannot find Theme with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Theme with id=" + id,
      });
    });
};

exports.findByInvitationId = (req, res) => {
  const id = req.params.id;

  Theme.findAll({
    where: { invitationId: id },
    include: { model: db.invitation },
    order: [["updatedAt", "DESC"]],
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
          message: `Cannot find Theme with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Theme with id=" + id,
      });
    });
};

// Update a Theme by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Theme.findOne({
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
            message: "Error updating Theme with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Theme with id=${id}. Maybe Theme was not found or req.body is empty!`,
      });
    });
};

// Delete a Theme with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Theme.findOne({
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
            message: `Cannot delete Theme with id=${id}. Maybe Theme was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Theme with id=" + id,
      });
    });
};

// Delete all Themes from the database.
exports.deleteAll = (req, res) => {
  Theme.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Themes were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all.theme.",
      });
    });
};
