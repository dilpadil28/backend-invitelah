const db = require("../db/models");
const MainLandingList = db.mainLandingList;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new MainLandingList
exports.create = (req, res) => {
  // Create a MainLandingList
  const mainLandingList = {
    title: req.body.title,
    description: req.body.description,
    image: req.file === undefined ? "" : req.file.filename,
    mainLandingId: req.body.mainLandingId,
  };

  // Save MainLandingList in the database
  MainLandingList.create(mainLandingList)
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
          "Some error occurred while creating the MainLandingList.",
      });
    });
};

// Retrieve all MainLandingLists from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  MainLandingList.findAll({
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
          "Some error occurred while retrieving mainLandingList.",
      });
    });
};

// Find a single MainLandingList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MainLandingList.findOne({
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
          message: `Cannot find MainLandingList with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving MainLandingList with id=" + id,
      });
    });
};

// Update a MainLandingList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  MainLandingList.findOne({
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
            message: "Error updating MainLandingList with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update MainLandingList with id=${id}. Maybe MainLandingList was not found or req.body is empty!`,
      });
    });
};

// Delete a MainLandingList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  MainLandingList.findOne({
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
            message: `Cannot delete MainLandingList with id=${id}. Maybe MainLandingList was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete MainLandingList with id=" + id,
      });
    });
};

// Delete all MainLandingLists from the database.
exports.deleteAll = (req, res) => {
  MainLandingList.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} MainLandingLists were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all.mainLandingList.",
      });
    });
};
