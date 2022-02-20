const { authJwt } = require("../middleware");
const controller = require("../controllers/socialMedia.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreate,
} = require("../middleware/validation/socialMediaValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(`${api.URL}/socialmedia`, [authJwt.verifyToken], controller.create);
  app.get(`${api.URL}/socialmedia`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/socialmedia/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.patch(
    `${api.URL}/socialmedia/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/socialmedia/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/socialmedia`,
    authJwt.verifyToken,
    controller.deleteAll
  );
};
