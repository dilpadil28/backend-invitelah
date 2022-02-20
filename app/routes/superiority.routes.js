const { authJwt } = require("../middleware");
const controller = require("../controllers/superiority.controller");
const controllerList = require("../controllers/superiorityList.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreateList,
  validateOneList,
  validateUpdateList,
} = require("../middleware/validation/superiorityValidation");
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
    `${api.URL}/superiority`,
    [authJwt.verifyToken, validateTitle],
    controller.create
  );
  app.get(`${api.URL}/superiority`, controller.findAll);
  app.get(
    `${api.URL}/superiority/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.patch(
    `${api.URL}/superiority/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/superiority/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/superiority`,
    authJwt.verifyToken,
    controller.deleteAll
  );

  app.post(
    `${api.URL}/superioritylist`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreateList],
    controllerList.create
  );
  app.get(
    `${api.URL}/superioritylist`,
    authJwt.verifyToken,
    controllerList.findAll
  );
  app.get(
    `${api.URL}/superioritylist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.findOne
  );
  app.patch(
    `${api.URL}/superioritylist/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdateList],
    controllerList.update
  );
  app.delete(
    `${api.URL}/superioritylist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.delete
  );
  app.delete(
    `${api.URL}/superioritylist`,
    authJwt.verifyToken,
    controllerList.deleteAll
  );
};
