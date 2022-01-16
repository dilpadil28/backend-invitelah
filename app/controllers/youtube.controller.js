const db = require("../models");
const Youtube = db.youtube;
const Op = db.Sequelize.Op;

// Create and Save a new Youtube
exports.create = (req, res) => {
  // Create a Youtube
  const youtube = {
    title: req.body.title,
    url: req.body.url,
  };

  // Save Youtube in the database
  Youtube.create(youtube)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Youtube.",
      });
    });
};

// Retrieve all Fiturs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Youtube.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving youtube.",
      });
    });
};

// Find a single Youtube with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Youtube.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Youtube with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Youtube with id=" + id,
      });
    });
};

// Update a Youtube by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Youtube.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Youtube was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Youtube with id=${id}. Maybe Youtube was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Youtube with id=" + id,
      });
    });
};

// Delete a Youtube with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Youtube.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Youtube was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Youtube with id=${id}. Maybe Youtube was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Youtube with id=" + id,
      });
    });
};

// Delete all Fiturs from the database.
exports.deleteAll = (req, res) => {
  Youtube.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Fiturs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.youtube.",
      });
    });
};

// find all published Youtube
exports.findAllPublished = (req, res) => {
  Youtube.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.youtube.",
      });
    });
};
