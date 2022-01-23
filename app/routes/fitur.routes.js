const { authJwt } = require("../middleware");
const controller = require("../controllers/fitur.controller");
const controllerList = require("../controllers/fiturList.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreateList,
  validateOneList,
  validateUpdateList,
} = require("../middleware/validation/fiturValidation");
const { validateTitle } = require("../middleware/globalValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${api.URL}/fitur`,
    [authJwt.verifyToken, validateTitle],
    controller.create
  );
  app.get(`${api.URL}/fitur`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/fitur/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.put(
    `${api.URL}/fitur/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/fitur/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/fitur`, authJwt.verifyToken, controller.deleteAll);

  app.post(
    `${api.URL}/fiturlist`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreateList],
    controllerList.create
  );
  app.get(`${api.URL}/fiturlist`, authJwt.verifyToken, controllerList.findAll);
  app.get(
    `${api.URL}/fiturlist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.findOne
  );
  app.put(
    `${api.URL}/fiturlist/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdateList],
    controllerList.update
  );
  app.delete(
    `${api.URL}/fiturlist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.delete
  );
  app.delete(
    `${api.URL}/fiturlist`,
    authJwt.verifyToken,
    controllerList.deleteAll
  );
};
