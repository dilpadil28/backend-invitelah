const db = require("../models");
const Fitur = db.fitur;
const Op = db.Sequelize.Op;

// Create and Save a new Fitur
exports.create = (req, res) => {
  // Create a Fitur
  const fitur = {
    name: req.body.name,
    image: req.body.image,
  };

  // Save Fitur in the database
  Fitur.create(fitur)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Fitur.",
      });
    });
};

// Retrieve all Fiturs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Fitur.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving fitur.",
      });
    });
};

// Find a single Fitur with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Fitur.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Fitur with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Fitur with id=" + id,
      });
    });
};

// Update a Fitur by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Fitur.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Fitur was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Fitur with id=${id}. Maybe Fitur was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Fitur with id=" + id,
      });
    });
};

// Delete a Fitur with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Fitur.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Fitur was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Fitur with id=${id}. Maybe Fitur was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Fitur with id=" + id,
      });
    });
};

// Delete all Fiturs from the database.
exports.deleteAll = (req, res) => {
  Fitur.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Fiturs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all.fitur.",
      });
    });
};

// find all published Fitur
exports.findAllPublished = (req, res) => {
  Fitur.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.fitur.",
      });
    });
};
