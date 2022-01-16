const db = require("../models");
const Testimonial = db.testimonial;
const Op = db.Sequelize.Op;

// Create and Save a new Testimonial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Testimonial
  const testimonial = {
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    image: req.body.image,
  };

  // Save Testimonial in the database
  Testimonial.create(testimonial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Testimonial.",
      });
    });
};

// Retrieve all Testimonials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Testimonial.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving testimonial.",
      });
    });
};

// Find a single Testimonial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Testimonial.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Testimonial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Testimonial with id=" + id,
      });
    });
};

// Update a Testimonial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Testimonial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Testimonial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Testimonial with id=${id}. Maybe Testimonial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Testimonial with id=" + id,
      });
    });
};

// Delete a Testimonial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Testimonial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Testimonial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Testimonial with id=${id}. Maybe Testimonial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Testimonial with id=" + id,
      });
    });
};

// Delete all Testimonials from the database.
exports.deleteAll = (req, res) => {
  Testimonial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Testimonials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.testimonial.",
      });
    });
};

// find all published Testimonial
exports.findAllPublished = (req, res) => {
  Testimonial.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving.testimonial.",
      });
    });
};
