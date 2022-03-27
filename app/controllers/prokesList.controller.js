const db = require("../db/models");
const ProkesList = db.prokesList;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new ProkesList
exports.create = (req, res) => {
  // Create a ProkesList
  const prokesList = {
    title: req.body.title,
    image: req.file === undefined ? "" : req.file.filename,
    prokesId: req.body.prokesId,
  };

  // Save ProkesList in the database
  ProkesList.create(prokesList)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ProkesList.",
      });
    });
};

// Retrieve all ProkesLists from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  ProkesList.findAll({
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
          err.message || "Some error occurred while retrieving prokesList.",
      });
    });
};

// Find a single ProkesList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ProkesList.findOne({
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
          message: `Cannot find ProkesList with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ProkesList with id=" + id,
      });
    });
};

// Update a ProkesList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ProkesList.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      if (req.file !== undefined && data.image !== "") {
        fs.unlink("./upload/images/" + data.image, (err) => {
          if (err) throw err;
        });
      }
      data
        .update({
          title: req.body.title,
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
            message: "Error updating ProkesList with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update ProkesList with id=${id}. Maybe ProkesList was not found or req.body is empty!`,
      });
    });
};

// Delete a ProkesList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ProkesList.findOne({
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
            message: `Cannot delete ProkesList with id=${id}. Maybe ProkesList was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ProkesList with id=" + id,
      });
    });
};

// Delete all ProkesLists from the database.
exports.deleteAll = (req, res) => {
  ProkesList.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ProkesLists were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.prokesList.",
      });
    });
};
