const db = require("../db/models");
const LoveStory = db.loveStory;
const Op = db.Sequelize.Op;

// Create and Save a new LoveStory
exports.create = (req, res) => {
  // Save LoveStory in the database
  LoveStory.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the LoveStory.",
      });
    });
};

// Retrieve all LoveStorys from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  LoveStory.findAll({
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
          err.message || "Some error occurred while retrieving loveStory;.",
      });
    });
};

// Find a single LoveStory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  LoveStory.findOne({
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
          message: `Cannot find LoveStory with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving LoveStory with id=" + id,
      });
    });
};

exports.findByInvitationId = (req, res) => {
  const id = req.params.id;

  LoveStory.findAll({
    where: { invitationId: id },
    include: { model: db.invitation },
    order: [["updatedAt", "DESC"]],
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
          message: `Cannot find LoveStory with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving LoveStory with id=" + id,
      });
    });
};

// Update a LoveStory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  LoveStory.findOne({
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
            message: "Error updating LoveStory with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update LoveStory with id=${id}. Maybe LoveStory was not found or req.body is empty!`,
      });
    });
};

// Delete a LoveStory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  LoveStory.findOne({
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
            message: `Cannot delete LoveStory with id=${id}. Maybe LoveStory was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete LoveStory with id=" + id,
      });
    });
};

// Delete all LoveStorys from the database.
exports.deleteAll = (req, res) => {
  LoveStory.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} LoveStorys were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.loveStory;.",
      });
    });
};
