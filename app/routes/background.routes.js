const { authJwt } = require("../middleware");
const controller = require("../controllers/background.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const { validateName } = require("../middleware/globalValidation");
const {
  validateOne,
  validateUpdate,
} = require("../middleware/validation/backgroundValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${api.URL}/background`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateName],
    controller.create
  );
  app.get(`${api.URL}/background`, authJwt.verifyToken, controller.findAll);
  app.get(`${api.URL}/background/:id`, validateOne, controller.findOne);
  app.put(
    `${api.URL}/background/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/background/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/background`,
    authJwt.verifyToken,
    controller.deleteAll
  );
};
