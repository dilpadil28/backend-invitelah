const { authJwt } = require("../middleware");
const controller = require("../controllers/music.controller");
const uploadFilesMiddleware = require("../middleware/uploadMusic");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreate,
} = require("../middleware/validation/musicValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${api.URL}/music`,
    [uploadFilesMiddleware, authJwt.verifyToken],
    controller.create
  );
  app.get(`${api.URL}/music`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/music/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.patch(
    `${api.URL}/music/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/music/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/music`, authJwt.verifyToken, controller.deleteAll);
};
