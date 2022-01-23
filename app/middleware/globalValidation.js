const { body, validationResult, param } = require("express-validator");

module.exports = {
  validateCreate: [
    body("name").notEmpty().withMessage("name is required"),
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
