const db = require("../db/models");
const SocialMedia = db.socialMedia;
const Op = db.Sequelize.Op;

// Create and Save a new SocialMedia
exports.create = (req, res) => {
  // Save SocialMedia in the database
  SocialMedia.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SocialMedia.",
      });
    });
};

// Retrieve all SocialMedias from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  SocialMedia.findAll({
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
          err.message || "Some error occurred while retrieving socialMedia.",
      });
    });
};

// Find a single SocialMedia with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SocialMedia.findOne({
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
          message: `Cannot find SocialMedia with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving SocialMedia with id=" + id,
      });
    });
};

// Update a SocialMedia by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  SocialMedia.findOne({
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
            message: "Error updating SocialMedia with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update SocialMedia with id=${id}. Maybe SocialMedia was not found or req.body is empty!`,
      });
    });
};

// Delete a SocialMedia with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SocialMedia.findOne({
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
            message: `Cannot delete SocialMedia with id=${id}. Maybe SocialMedia was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete SocialMedia with id=" + id,
      });
    });
};

// Delete all SocialMedias from the database.
exports.deleteAll = (req, res) => {
  SocialMedia.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} SocialMedias were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.socialMedia.",
      });
    });
};
