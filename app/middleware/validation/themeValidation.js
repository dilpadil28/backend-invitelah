const { body, validationResult, param } = require("express-validator");
const db = require("../../db/models");
const Theme = db.theme;
module.exports = {
  validateCreate: [
    body("name").notEmpty().withMessage("name is required"),
    body("musicId").notEmpty().withMessage("Music is required"),
    body("galleryType").notEmpty().withMessage("galleryType is required"),
    body("fontType1").notEmpty().withMessage("fontType1 is required"),
    body("fontType2").notEmpty().withMessage("fontType2 is required"),
    body("fontColor2").notEmpty().withMessage("fontColor2 is required"),
    body("backgroundColor")
      .notEmpty()
      .withMessage("backgroundColor is required"),
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
        const checking = await Theme.findOne({
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
      .withMessage("invitation id must be an number"),
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
        const checking = await Theme.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    body("name").notEmpty().withMessage("name is required"),
    body("musicId").notEmpty().withMessage("Music is required"),
    body("galleryType").notEmpty().withMessage("galleryType is required"),
    body("fontType1").notEmpty().withMessage("fontType1 is required"),
    body("fontType2").notEmpty().withMessage("fontType2 is required"),
    body("fontColor2").notEmpty().withMessage("fontColor2 is required"),
    body("backgroundColor")
      .notEmpty()
      .withMessage("backgroundColor is required"),
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
