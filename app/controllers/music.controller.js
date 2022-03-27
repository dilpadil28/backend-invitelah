const db = require("../db/models");
const Music = db.music;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new Music
exports.create = (req, res) => {
  // Create a Music
  const music = {
    title: req.body.title,
    song: req.file === undefined ? "" : req.file.filename,
    published: req.body.published,
  };

  // Save Music in the database
  Music.create(music)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Music.",
      });
    });
};

// Retrieve all Backgrounds from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Music.findAll({
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
        message: err.message || "Some error occurred while retrieving music.",
      });
    });
};

// Find a single Music with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Music.findOne({
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
          message: `Cannot find Music with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Music with id=" + id,
      });
    });
};

// Update a Music by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Music.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      if (req.file !== undefined && data.image !== "") {
        fs.unlink("./upload/files/songs/" + data.song, (err) => {
          if (err) throw err;
        });
      }
      data
        .update({
          title: req.body.title,
          song: req.file === undefined ? data.song : req.file.filename,
          published: req.body.published,
        })
        .then(() => {
          res.status(200).send({
            message: "success",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Music with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Music with id=${id}. Maybe Music was not found or req.body is empty!`,
      });
    });
};

// Delete a Music with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Music.findOne({
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
          if (data.song !== "") {
            fs.unlink("./upload/files/songs/" + data.song, (err) => {
              if (err) throw err;
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: `Cannot delete Music with id=${id}. Maybe Music was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Music with id=" + id,
      });
    });
};

// Delete all Backgrounds from the database.
exports.deleteAll = (req, res) => {
  Music.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Backgrounds were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all.music.",
      });
    });
};
