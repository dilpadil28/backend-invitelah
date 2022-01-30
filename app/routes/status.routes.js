const { authJwt } = require("../middleware");
const controller = require("../controllers/status.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
} = require("../middleware/validation/statusValidation");
const { validateName } = require("../middleware/globalValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${api.URL}/status`,
    [authJwt.verifyToken, validateName],
    controller.create
  );
  app.get(`${api.URL}/status`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/status/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.put(
    `${api.URL}/status/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/status/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/status`, authJwt.verifyToken, controller.deleteAll);
};
