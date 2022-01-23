const { authJwt } = require("../middleware");
const controller = require("../controllers/photoGallery.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
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
    `${api.URL}/photogallery`,
    [uploadFilesMiddleware, authJwt.verifyToken],
    controller.create
  );
  app.get(`${api.URL}/photogallery`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/photogallery/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.put(
    `${api.URL}/photogallery/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/photogallery/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/photogallery`,
    authJwt.verifyToken,
    controller.deleteAll
  );
};
