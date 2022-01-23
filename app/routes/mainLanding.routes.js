const { authJwt } = require("../middleware");
const controller = require("../controllers/mainLanding.controller");
const controllerList = require("../controllers/mainLandingList.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreateList,
  validateOneList,
  validateUpdateList,
} = require("../middleware/validation/mainLandingValidation");
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
    `${api.URL}/mainlanding`,
    [authJwt.verifyToken, validateTitle],
    controller.create
  );
  app.get(`${api.URL}/mainlanding`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/mainlanding/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.put(
    `${api.URL}/mainlanding/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/mainlanding/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/mainlanding`,
    authJwt.verifyToken,
    controller.deleteAll
  );

  app.post(
    `${api.URL}/mainlandinglist`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreateList],
    controllerList.create
  );
  app.get(
    `${api.URL}/mainlandinglist`,
    authJwt.verifyToken,
    controllerList.findAll
  );
  app.get(
    `${api.URL}/mainlandinglist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.findOne
  );
  app.put(
    `${api.URL}/mainlandinglist/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdateList],
    controllerList.update
  );
  app.delete(
    `${api.URL}/mainlandinglist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.delete
  );
  app.delete(
    `${api.URL}/mainlandinglist`,
    authJwt.verifyToken,
    controllerList.deleteAll
  );
};
