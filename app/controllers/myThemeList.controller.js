const db = require("../db/models");
const MyThemeList = db.myThemeList;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new MyThemeList
exports.create = (req, res) => {
  // Create a MyThemeList
  const myThemeList = {
    name: req.body.name,
    image: req.file === undefined ? "" : req.file.filename,
    url: req.body.url,
    myThemeId: req.body.myThemeId,
  };

  // Save MyThemeList in the database
  MyThemeList.create(myThemeList)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MyThemeList.",
      });
    });
};

// Retrieve all MyThemeLists from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  MyThemeList.findAll({
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
          err.message || "Some error occurred while retrieving myThemeList.",
      });
    });
};

// Find a single MyThemeList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MyThemeList.findOne({
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
          message: `Cannot find MyThemeList with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving MyThemeList with id=" + id,
      });
    });
};

// Update a MyThemeList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  MyThemeList.findOne({
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
          name: req.body.name,
          image: req.file === undefined ? data.image : req.file.filename,
          url: req.body.url,
        })
        .then(() => {
          res.status(200).send({
            message: "success",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating MyThemeList with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update MyThemeList with id=${id}. Maybe MyThemeList was not found or req.body is empty!`,
      });
    });
};

// Delete a MyThemeList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  MyThemeList.findOne({
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
            message: `Cannot delete MyThemeList with id=${id}. Maybe MyThemeList was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete MyThemeList with id=" + id,
      });
    });
};

// Delete all MyThemeLists from the database.
exports.deleteAll = (req, res) => {
  MyThemeList.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} MyThemeLists were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.myThemeList.",
      });
    });
};
