const db = require("../models");
const Keunggulan = db.keunggulan;
const Op = db.Sequelize.Op;

// Create and Save a new Keunggulan
exports.create = (req, res) => {
  // Create a Keunggulan
  const keunggulan = {
    title: req.body.title,
    description: req.body.description,
  };

  // Save Keunggulan in the database
  Keunggulan.create(keunggulan)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Keunggulan.",
      });
    });
};

// Retrieve all Keunggulans from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Keunggulan.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving keunggulan.",
      });
    });
};

// Find a single Keunggulan with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Keunggulan.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Keunggulan with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Keunggulan with id=" + id,
      });
    });
};

// Update a Keunggulan by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Keunggulan.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Keunggulan was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Keunggulan with id=${id}. Maybe Keunggulan was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Keunggulan with id=" + id,
      });
    });
};

// Delete a Keunggulan with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Keunggulan.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Keunggulan was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Keunggulan with id=${id}. Maybe Keunggulan was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Keunggulan with id=" + id,
      });
    });
};

// Delete all Keunggulans from the database.
exports.deleteAll = (req, res) => {
  Keunggulan.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Keunggulans were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.keunggulan.",
      });
    });
};

// find all published Keunggulan
exports.findAllPublished = (req, res) => {
  Keunggulan.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving.keunggulan.",
      });
    });
};
