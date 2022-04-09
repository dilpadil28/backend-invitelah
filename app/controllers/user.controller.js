const db = require("../db/models");
const role = require("../db/models/role");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");

// Create and Save a new User
exports.create = (req, res) => {
  // Save User in the database
  User.create(req.body)
    .then((data) => {
      if (req.body.roles) {
        role
          .findAll({
            where: {
              name: {
                [Op.or]: req.body.roles,
              },
            },
          })
          .then((roles) => {
            data.setRoles(roles).then(() => {
              res.status(201).json({
                message: "success",
                data: data,
              });
            });
          });
      } else {
        // user role = 1
        data.setRoles([3]).then(() => {
          res.status(201).json({
            message: "success",
            data: data,
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { [Op.like]: `%${username}%` } }
    : null;

  User.findAll({
    where: condition,
    order: [["id", "DESC"]],
    include: {
      model: db.role,
      attributes: ["id", "name"],
      through: {
        attributes: ["roleId", "userId"],
      },
    },
    attributes: ["id", "fullName", "username", "phoneNumber", "email"],
  })
    .then((data) => {
      res.status(200).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findOne({
    where: { id: id },
    include: {
      model: db.role,
      attributes: ["id", "name"],
      through: {
        attributes: ["roleId", "userId"],
      },
    },
    attributes: ["id", "fullName", "username", "phoneNumber", "email"],
  })
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "success",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  User.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      data
        .update({
          fullName: req.body.fullName,
          username: req.body.username,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          password: !req.body.password
            ? data.password
            : bcrypt.hashSync(req.body.password, 8),
          passwordChangeAt: req.body.password
            ? new Date()
            : data.passwordChangeAt,
        })
        .then((user) => {
          if (req.body.roles) {
            db.role
              .findAll({
                where: {
                  name: {
                    [Op.or]: req.body.roles,
                  },
                },
              })
              .then((roles) => {
                user.setRoles(roles).then(() => {
                  res.status(200).send({
                    message: "success",
                    data: data,
                  });
                });
              });
          } else {
            // user role = 1
            user.setRoles([3]).then(() => {
              res.status(200).send({
                message: "success",
                data: data,
              });
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating User with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findOne({
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
            message: `Cannot delete User with id=${id}. Maybe User was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all.user.",
      });
    });
};
