const db = require("../models");
const Faq = db.faq;
const Op = db.Sequelize.Op;

// Create and Save a new Faq
exports.create = (req, res) => {
  // Create a Faq
  const faq = {
    title: req.body.title,
    description: req.body.description,
  };

  // Save Faq in the database
  Faq.create(faq)
    .then((data) => {
      res.send(data);
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

  Faq.findAll({ where: condition })
    .then((data) => {
      res.send(data);
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

  Faq.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
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

  Faq.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Faq was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Faq with id=${id}. Maybe Faq was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Faq with id=" + id,
      });
    });
};

// Delete a Faq with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Faq.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Faq was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Faq with id=${id}. Maybe Faq was not found!`,
        });
      }
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
      res.send({ message: `${nums} Faqs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all.faq.",
      });
    });
};

// find all published Faq
exports.findAllPublished = (req, res) => {
  Faq.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.faq.",
      });
    });
};
