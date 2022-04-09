const db = require("../db/models");
const Faq = db.faq;
const Op = db.Sequelize.Op;

// Create and Save a new Faq
exports.create = (req, res) => {
  // Save Faq in the database
  Faq.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Faq.",
      });
    });
};

// Retrieve all Faqs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Faq.findAll({
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
        message: err.message || "Some error occurred while retrieving faq.",
      });
    });
};

// Find a single Faq with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Faq.findOne({
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
          message: `Cannot find Faq with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Faq with id=" + id,
      });
    });
};

// Update a Faq by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Faq.findOne({
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
            message: "Error updating Faq with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Faq with id=${id}. Maybe Faq was not found or req.body is empty!`,
      });
    });
};

// Delete a Faq with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Faq.findOne({
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
            message: `Cannot delete Faq with id=${id}. Maybe Faq was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Faq with id=" + id,
      });
    });
};

// Delete all Faqs from the database.
exports.deleteAll = (req, res) => {
  Faq.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Faqs were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all.faq.",
      });
    });
};
