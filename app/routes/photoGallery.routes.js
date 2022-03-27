const { authJwt } = require("../middleware");
const controller = require("../controllers/photoGallery.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateByInvitationId,
  validateCreate,
} = require("../middleware/validation/photoGalleryValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${api.URL}/photo-gallery`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreate],
    controller.create
  );
  app.get(`${api.URL}/photo-gallery`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/photo-gallery/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.get(
    `${api.URL}/photo-gallery-invitation/:id`,
    [authJwt.verifyToken, validateByInvitationId],
    controller.findByInvitationId
  );
  app.patch(
    `${api.URL}/photo-gallery/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/photo-gallery/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/photo-gallery`,
    authJwt.verifyToken,
    controller.deleteAll
  );
};
