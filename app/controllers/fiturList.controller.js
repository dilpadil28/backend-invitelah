const db = require("../db/models");
const FiturList = db.fiturList;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new FiturList
exports.create = (req, res) => {
  // Create a FiturList
  const fiturList = {
    title: req.body.title,
    description: req.body.description,
    image: req.file === undefined ? "" : req.file.filename,
    fiturId: req.body.fiturId,
  };

  // Save FiturList in the database
  FiturList.create(fiturList)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the FiturList.",
      });
    });
};

// Retrieve all FiturLists from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  FiturList.findAll({
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
          err.message || "Some error occurred while retrieving fiturList.",
      });
    });
};

// Find a single FiturList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  FiturList.findOne({
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
          message: `Cannot find FiturList with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving FiturList with id=" + id,
      });
    });
};

// Update a FiturList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  FiturList.findOne({
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
          title: req.body.title,
          description: req.body.description,
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
            message: "Error updating FiturList with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update FiturList with id=${id}. Maybe FiturList was not found or req.body is empty!`,
      });
    });
};

// Delete a FiturList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  FiturList.findOne({
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
            message: `Cannot delete FiturList with id=${id}. Maybe FiturList was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete FiturList with id=" + id,
      });
    });
};

// Delete all FiturLists from the database.
exports.deleteAll = (req, res) => {
  FiturList.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} FiturLists were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.fiturList.",
      });
    });
};
