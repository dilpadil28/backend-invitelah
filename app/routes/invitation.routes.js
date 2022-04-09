const { authJwt } = require("../middleware");
const controller = require("../controllers/invitation.controller");
const controllerType = require("../controllers/invitationType.controller");
const uploadFilesMiddleware = require("../middleware/uploadAvatar");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateOneType,
  validateUpdateType,
  validateCreate,
  validateSlug,
} = require("../middleware/validation/invitationValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${api.URL}/invitation`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreate],
    controller.create
  );
  app.get(`${api.URL}/invitation`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/invitation/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.get(
    `${api.URL}/invitation/slug/:slug`,
    [validateSlug],
    controller.findBySlug
  );
  app.patch(
    `${api.URL}/invitation/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/invitation/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/invitation`,
    authJwt.verifyToken,
    controller.deleteAll
  );

  app.post(
    `${api.URL}/invitationtype`,
    [uploadFilesMiddleware, authJwt.verifyToken],
    controllerType.create
  );
  app.get(
    `${api.URL}/invitationtype`,
    authJwt.verifyToken,
    controllerType.findAll
  );
  app.get(
    `${api.URL}/invitationtype/:id`,
    [authJwt.verifyToken, validateOneType],
    controllerType.findOne
  );
  app.patch(
    `${api.URL}/invitationtype/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdateType],
    controllerType.update
  );
  app.delete(
    `${api.URL}/invitationtype/:id`,
    [authJwt.verifyToken, validateOneType],
    controllerType.delete
  );
  app.delete(
    `${api.URL}/invitationtype`,
    authJwt.verifyToken,
    controllerType.deleteAll
  );
};
