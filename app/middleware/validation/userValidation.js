const { body, validationResult, param } = require("express-validator");
const { user } = require("../../db/models");
module.exports = {
  validateCreate: [
    body("fullName").notEmpty().withMessage("fullName is required"),
    body("username")
      .notEmpty()
      .withMessage("username is required")
      .bail()
      .custom((value) => {
        return user.findOne({ where: { username: value } }).then((username) => {
          if (username) {
            return Promise.reject();
          }
        });
      })
      .withMessage("Failed! Username is already in use!"),
    body("phoneNumber")
      .notEmpty()
      .withMessage("phoneNumber is required")
      .bail()
      .custom((value) => {
        return user
          .findOne({ where: { phoneNumber: value } })
          .then((phoneNumber) => {
            if (phoneNumber) {
              return Promise.reject();
            }
          });
      })
      .withMessage("Failed! Phone Number is already in use!"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .bail()
      .custom((value) => {
        return user.findOne({ where: { email: value } }).then((email) => {
          if (email) {
            return Promise.reject();
          }
        });
      })
      .withMessage("Failed! Email is already in use!"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Failed! Password minimum 6 character "),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],
  validateOne: [
    param("id")
      .notEmpty()
      .withMessage("param is required")
      .bail()
      .isNumeric()
      .withMessage("id must be an number")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await user.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],
  validateUpdate: [
    param("id")
      .notEmpty()
      .withMessage("param is required")
      .bail()
      .isNumeric()
      .withMessage("id must be an number")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await user.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    body("fullName").notEmpty().withMessage("fullName is required"),
    body("username").notEmpty().withMessage("username is required"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],
};
