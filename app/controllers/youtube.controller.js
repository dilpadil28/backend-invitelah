const db = require("../db/models");
const Youtube = db.youtube;
const Op = db.Sequelize.Op;

// Create and Save a new Youtube
exports.create = (req, res) => {
  // Save Youtube in the database
  Youtube.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Youtube.",
      });
    });
};

// Retrieve all Youtubes from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Youtube.findAll({
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
          err.message || "Some error occurred while retrieving youtube;.",
      });
    });
};

// Find a single Youtube with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Youtube.findOne({
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
  Youtube.findOne({
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
            message: "Error updating Youtube with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Youtube with id=${id}. Maybe Youtube was not found or req.body is empty!`,
      });
    });
};

// Delete a Youtube with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Youtube.findOne({
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
            message: `Cannot delete Youtube with id=${id}. Maybe Youtube was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Youtube with id=" + id,
      });
    });
};

// Delete all Youtubes from the database.
exports.deleteAll = (req, res) => {
  Youtube.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Youtubes were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.youtube;.",
      });
    });
};
