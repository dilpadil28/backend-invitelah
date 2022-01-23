const { body, validationResult, param } = require("express-validator");
const { orderStep, orderStepList } = require("../../db/models");
module.exports = {
  validateOne: [
    param("id")
      .notEmpty()
      .withMessage("param is required")
      .bail()
      .isNumeric()
      .withMessage("id must be an number")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await orderStep.findOne({
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
        const checking = await orderStep.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    body("title").notEmpty().withMessage("title is required"),
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
  validateCreateList: [
    body("name").notEmpty().withMessage("name is required"),
    body("image").notEmpty().withMessage("image is required"),
    body("url").notEmpty().withMessage("url is required"),
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
  validateOneList: [
    param("id")
      .notEmpty()
      .withMessage("param is required")
      .bail()
      .isNumeric()
      .withMessage("id must be an number")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await orderStepList.findOne({
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
  validateUpdateList: [
    param("id")
      .notEmpty()
      .withMessage("param is required")
      .bail()
      .isNumeric()
      .withMessage("id must be an number")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await orderStepList.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    body("name").notEmpty().withMessage("name is required"),
    body("image").notEmpty().withMessage("image is required"),
    body("url").notEmpty().withMessage("url is required"),
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
