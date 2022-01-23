const db = require("../models");
const FaqList = db.faqList;
const Op = db.Sequelize.Op;

// Create and Save a new FaqList
exports.create = (req, res) => {
  // Save FaqList in the database
  FaqList.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the FaqList.",
      });
    });
};

// Retrieve all FaqLists from the database.
exports.findAll = (req, res) => {
  const question = req.query.question;
  var condition = question
    ? { question: { [Op.like]: `%${question}%` } }
    : null;

  FaqList.findAll({
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
        message: err.message || "Some error occurred while retrieving faqList.",
      });
    });
};

// Find a single FaqList with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  FaqList.findOne({
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
          message: `Cannot find FaqList with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving FaqList with id=" + id,
      });
    });
};

// Update a FaqList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  FaqList.findOne({
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
            message: "Error updating FaqList with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update FaqList with id=${id}. Maybe FaqList was not found or req.body is empty!`,
      });
    });
};

// Delete a FaqList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  FaqList.findOne({
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
            message: `Cannot delete FaqList with id=${id}. Maybe FaqList was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete FaqList with id=" + id,
      });
    });
};

// Delete all FaqLists from the database.
exports.deleteAll = (req, res) => {
  FaqList.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} FaqLists were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.faqList.",
      });
    });
};
