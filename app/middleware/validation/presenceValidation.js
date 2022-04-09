const { body, validationResult, param } = require("express-validator");
const db = require("../../db/models");
const Presence = db.presence;
module.exports = {
  validateCreate: [
    body("name").notEmpty().withMessage("name is required"),
    body("message").notEmpty().withMessage("message is required"),
    body("phoneNumber").notEmpty().withMessage("phoneNumber is required"),
    body("confirmation").notEmpty().withMessage("confirmation is required"),
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
        const checking = await Presence.findOne({
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
  validateByInvitationId: [
    param("id")
      .notEmpty()
      .withMessage("param is required")
      .bail()
      .isNumeric()
      .withMessage("invitation id must be an number")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await Presence.findOne({ where: { invitationId: value }, });


        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param invitation id not found"),
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
        const checking = await Presence.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    body("name").notEmpty().withMessage("name is required"),
    body("message").notEmpty().withMessage("message is required"),
    body("confirmation").notEmpty().withMessage("confirmation is required"),
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
