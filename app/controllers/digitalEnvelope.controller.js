const db = require("../db/models");
const DigitalEnvelope = db.digitalEnvelope;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new DigitalEnvelope
exports.create = (req, res) => {
  // Create a DigitalEnvelope
  const digitalEnvelope = {
    name: req.body.name,
    number: req.body.number,
    published: req.body.published,
    image: req.file === undefined ? "" : req.file.filename,
    invitationId: req.body.invitationId,
  };

  // Save DigitalEnvelope in the database
  DigitalEnvelope.create(digitalEnvelope)
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
          "Some error occurred while creating the DigitalEnvelope.",
      });
    });
};

// Retrieve all DigitalEnvelopes from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  DigitalEnvelope.findAll({
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
          err.message ||
          "Some error occurred while retrieving digitalEnvelope.",
      });
    });
};

// Find a single DigitalEnvelope with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DigitalEnvelope.findOne({
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
          message: `Cannot find DigitalEnvelope with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving DigitalEnvelope with id=" + id,
      });
    });
};

// Update a DigitalEnvelope by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  DigitalEnvelope.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      if (req.file !== undefined) {
        fs.unlink("./upload/images/" + data.image, (err) => {
          if (err) throw err;
        });
      }
      data
        .update({
          name: req.body.name,
          image: req.file === undefined ? data.image : req.file.filename,
        })
        .then(() => {
          res.status(200).send({
            message: "success",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating DigitalEnvelope with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update DigitalEnvelope with id=${id}. Maybe DigitalEnvelope was not found or req.body is empty!`,
      });
    });
};

// Delete a DigitalEnvelope with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DigitalEnvelope.findOne({
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
          if (data.image !== "") {
            fs.unlink("./upload/images/" + data.image, (err) => {
              if (err) throw err;
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: `Cannot delete DigitalEnvelope with id=${id}. Maybe DigitalEnvelope was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete DigitalEnvelope with id=" + id,
      });
    });
};

// Delete all DigitalEnvelopes from the database.
exports.deleteAll = (req, res) => {
  DigitalEnvelope.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} DigitalEnvelopes were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all.digitalEnvelope.",
      });
    });
};
