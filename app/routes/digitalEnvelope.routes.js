const { authJwt } = require("../middleware");
const controller = require("../controllers/digitalEnvelope.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreate,
} = require("../middleware/validation/digitalEnvelopeValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${api.URL}/digitalenvelope`,
    [authJwt.verifyToken],
    controller.create
  );
  app.get(
    `${api.URL}/digitalenvelope`,
    authJwt.verifyToken,
    controller.findAll
  );
  app.get(
    `${api.URL}/digitalenvelope/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.put(
    `${api.URL}/digitalenvelope/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/digitalenvelope/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/digitalenvelope`,
    authJwt.verifyToken,
    controller.deleteAll
  );
};
