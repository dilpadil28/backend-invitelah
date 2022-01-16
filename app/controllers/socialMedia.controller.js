const db = require("../models");
const SocialMedia = db.socialMedia;
const Op = db.Sequelize.Op;

// Create and Save a new SocialMedia
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a SocialMedia
  const socialMedia = {
    name: req.body.name,
    url: req.body.url,
  };

  // Save SocialMedia in the database
  SocialMedia.create(socialMedia)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SocialMedia.",
      });
    });
};

// Retrieve all Fiturs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  SocialMedia.findAll({ where: condition })
    .then((data) => {
      res.send(data);
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

  SocialMedia.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
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

  SocialMedia.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SocialMedia was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update SocialMedia with id=${id}. Maybe SocialMedia was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating SocialMedia with id=" + id,
      });
    });
};

// Delete a SocialMedia with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SocialMedia.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SocialMedia was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete SocialMedia with id=${id}. Maybe SocialMedia was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete SocialMedia with id=" + id,
      });
    });
};

// Delete all Fiturs from the database.
exports.deleteAll = (req, res) => {
  SocialMedia.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Fiturs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.socialMedia.",
      });
    });
};

// find all published SocialMedia
exports.findAllPublished = (req, res) => {
  SocialMedia.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving.socialMedia.",
      });
    });
};
