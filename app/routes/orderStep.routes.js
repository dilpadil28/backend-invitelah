const { authJwt } = require("../middleware");
const controller = require("../controllers/orderStep.controller");
const controllerList = require("../controllers/orderStepList.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreateList,
  validateOneList,
  validateUpdateList,
} = require("../middleware/validation/orderStepValidation");
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
    `${api.URL}/orderstep`,
    [authJwt.verifyToken, validateTitle],
    controller.create
  );
  app.get(`${api.URL}/orderstep`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/orderstep/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.patch(
    `${api.URL}/orderstep/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/orderstep/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/orderstep`, authJwt.verifyToken, controller.deleteAll);

  app.post(
    `${api.URL}/ordersteplist`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreateList],
    controllerList.create
  );
  app.get(
    `${api.URL}/ordersteplist`,
    authJwt.verifyToken,
    controllerList.findAll
  );
  app.get(
    `${api.URL}/ordersteplist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.findOne
  );
  app.patch(
    `${api.URL}/ordersteplist/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdateList],
    controllerList.update
  );
  app.delete(
    `${api.URL}/ordersteplist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.delete
  );
  app.delete(
    `${api.URL}/ordersteplist`,
    authJwt.verifyToken,
    controllerList.deleteAll
  );
};
