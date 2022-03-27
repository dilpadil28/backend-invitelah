const db = require("../db/models");
const SuperiorityList = db.superiorityList;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new SuperiorityList
exports.create = (req, res) => {
  // Create a SuperiorityList
  const superiorityList = {
    title: req.body.title,
    image: req.file === undefined ? "" : req.file.filename,
    superiorityId: req.body.superiorityId,
  };

  // Save SuperiorityList in the database
  SuperiorityList.create(superiorityList)
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
          "Some error occurred while creating the SuperiorityList.",
      });
    });
};

// Retrieve all SuperiorityLists from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  SuperiorityList.findAll({
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
          "Some error occurred while retrieving superiorityList.",
      });
    });
};

// Find a single SuperiorityList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SuperiorityList.findOne({
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
          message: `Cannot find SuperiorityList with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving SuperiorityList with id=" + id,
      });
    });
};

// Update a SuperiorityList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  SuperiorityList.findOne({
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
            message: "Error updating SuperiorityList with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update SuperiorityList with id=${id}. Maybe SuperiorityList was not found or req.body is empty!`,
      });
    });
};

// Delete a SuperiorityList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SuperiorityList.findOne({
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
            message: `Cannot delete SuperiorityList with id=${id}. Maybe SuperiorityList was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete SuperiorityList with id=" + id,
      });
    });
};

// Delete all SuperiorityLists from the database.
exports.deleteAll = (req, res) => {
  SuperiorityList.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} SuperiorityLists were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all.superiorityList.",
      });
    });
};
