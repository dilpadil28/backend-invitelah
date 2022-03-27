const { authJwt } = require("../middleware");
const controller = require("../controllers/digitalEnvelope.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreate,
  validateByInvitationId,
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
    `${api.URL}/digital-envelope`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreate],
    controller.create
  );
  app.get(
    `${api.URL}/digital-envelope`,
    authJwt.verifyToken,
    controller.findAll
  );
  app.get(
    `${api.URL}/digital-envelope/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.get(
    `${api.URL}/digital-envelope-invitation/:id`,
    [authJwt.verifyToken, validateByInvitationId],
    controller.findByInvitationId
  );
  app.patch(
    `${api.URL}/digital-envelope/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/digital-envelope/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/digital-envelope`,
    authJwt.verifyToken,
    controller.deleteAll
  );
};
