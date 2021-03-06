const { authJwt } = require("../middleware");
const controller = require("../controllers/testimonial.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreate,
} = require("../middleware/validation/testimonialValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${api.URL}/testimonial`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreate],
    controller.create
  );
  app.get(`${api.URL}/testimonial`, authJwt.verifyToken, controller.findAll);
  app.get(`${api.URL}/testimonial/:id`, validateOne, controller.findOne);
  app.patch(
    `${api.URL}/testimonial/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/testimonial/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/testimonial`,
    authJwt.verifyToken,
    controller.deleteAll
  );
};
