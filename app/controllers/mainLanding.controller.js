const db = require("../db/models");
const MainLanding = db.mainLanding;
const Op = db.Sequelize.Op;

// Create and Save a new MainLanding
exports.create = (req, res) => {
  // Save MainLanding in the database
  MainLanding.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MainLanding.",
      });
    });
};

// Retrieve all MainLandings from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  MainLanding.findAll({
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
          err.message || "Some error occurred while retrieving mainLanding;.",
      });
    });
};

// Find a single MainLanding with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MainLanding.findOne({
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
          message: `Cannot find MainLanding with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving MainLanding with id=" + id,
      });
    });
};

// Update a MainLanding by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  MainLanding.findOne({
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
            message: "Error updating MainLanding with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update MainLanding with id=${id}. Maybe MainLanding was not found or req.body is empty!`,
      });
    });
};

// Delete a MainLanding with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  MainLanding.findOne({
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
        })
        .catch((err) => {
          res.status(500).send({
            message: `Cannot delete MainLanding with id=${id}. Maybe MainLanding was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete MainLanding with id=" + id,
      });
    });
};

// Delete all MainLandings from the database.
exports.deleteAll = (req, res) => {
  MainLanding.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} MainLandings were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.mainLanding;.",
      });
    });
};
