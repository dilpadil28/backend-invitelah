const db = require("../db/models");
const Testimonial = db.testimonial;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new Testimonial
exports.create = (req, res) => {
  // Create a Testimonial
  const testimonial = {
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    image: req.file === undefined ? "" : req.file.filename,
  };

  // Save Testimonial in the database
  Testimonial.create(testimonial)
    .then((data) => {
      res.status(201).json({
        message: "success",
        data: data,
      });
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

  Testimonial.findAll({
    where: condition,
    order: [["updatedAt", "DESC"]],
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
          err.message || "Some error occurred while retrieving testimonial.",
      });
    });
};

// Find a single Testimonial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Testimonial.findOne({
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
  Testimonial.findOne({
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
          name: req.body.name,
          description: req.body.description,
          rating: req.body.rating,
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
            message: "Error updating Testimonial with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update Testimonial with id=${id}. Maybe Testimonial was not found or req.body is empty!`,
      });
    });
};

// Delete a Testimonial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Testimonial.findOne({
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
            message: `Cannot delete Testimonial with id=${id}. Maybe Testimonial was not found!`,
          });
        });
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
