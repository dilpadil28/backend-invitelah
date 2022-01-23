const { body, validationResult, param } = require("express-validator");
const { faq, faqList } = require("../../db/models");
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
        const checking = await faq.findOne({
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
        const checking = await faq.findOne({
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
    body("answer").notEmpty().withMessage("answer is required"),
    body("question").notEmpty().withMessage("question is required"),
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
        const checking = await faqList.findOne({
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
        const checking = await faqList.findOne({
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
};
