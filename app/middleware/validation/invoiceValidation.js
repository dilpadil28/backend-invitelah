const { body, validationResult, param } = require("express-validator");
const { loveStory } = require("../../db/models");
module.exports = {
  validateCreate: [
    body("code").notEmpty().withMessage("code is required"),
    body("amount").notEmpty().withMessage("amount is required"),
    body("coupon").notEmpty().withMessage("coupon is required"),
    body("date").notEmpty().withMessage("date is required"),
    body("dueDate").notEmpty().withMessage("dueDate is required"),
    body("paymentDate").notEmpty().withMessage("paymentDate is required"),
    body("tax").notEmpty().withMessage("tax is required"),
    body("pamentMethod").notEmpty().withMessage("pamentMethod is required"),
    body("adminFee").notEmpty().withMessage("adminFee is required"),
    body("total").notEmpty().withMessage("total is required"),
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
        const checking = await loveStory.findOne({
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
        const checking = await loveStory.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    body("code").notEmpty().withMessage("code is required"),
    body("amount").notEmpty().withMessage("amount is required"),
    body("coupon").notEmpty().withMessage("coupon is required"),
    body("date").notEmpty().withMessage("date is required"),
    body("dueDate").notEmpty().withMessage("dueDate is required"),
    body("paymentDate").notEmpty().withMessage("paymentDate is required"),
    body("tax").notEmpty().withMessage("tax is required"),
    body("pamentMethod").notEmpty().withMessage("pamentMethod is required"),
    body("adminFee").notEmpty().withMessage("adminFee is required"),
    body("total").notEmpty().withMessage("total is required"),
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
