const { authJwt } = require("../middleware");
const controller = require("../controllers/myTheme.controller");
const controllerList = require("../controllers/myThemeList.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreateList,
  validateOneList,
  validateUpdateList,
} = require("../middleware/validation/myThemeValidation");
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
    `${api.URL}/mytheme`,
    [authJwt.verifyToken, validateTitle],
    controller.create
  );
  app.get(`${api.URL}/mytheme`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/mytheme/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.patch(
    `${api.URL}/mytheme/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/mytheme/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/mytheme`, authJwt.verifyToken, controller.deleteAll);

  app.post(
    `${api.URL}/mythemelist`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreateList],
    controllerList.create
  );
  app.get(
    `${api.URL}/mythemelist`,
    authJwt.verifyToken,
    controllerList.findAll
  );
  app.get(
    `${api.URL}/mythemelist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.findOne
  );
  app.patch(
    `${api.URL}/mythemelist/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdateList],
    controllerList.update
  );
  app.delete(
    `${api.URL}/mythemelist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.delete
  );
  app.delete(
    `${api.URL}/mythemelist`,
    authJwt.verifyToken,
    controllerList.deleteAll
  );
};
