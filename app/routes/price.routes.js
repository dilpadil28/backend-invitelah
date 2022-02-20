const { authJwt } = require("../middleware");
const controller = require("../controllers/price.controller");
const controllerList = require("../controllers/priceList.controller");
const controllerListUrl = require("../controllers/priceList.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreateList,
  validateOneList,
  validateUpdateList,
  validateCreateListUrl,
  validateOneListUrl,
  validateUpdateListUrl,
} = require("../middleware/validation/priceValidation");
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
    `${api.URL}/price`,
    [authJwt.verifyToken, validateTitle],
    controller.create
  );
  app.get(`${api.URL}/price`, controller.findAll);
  app.get(
    `${api.URL}/price/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.patch(
    `${api.URL}/price/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/price/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/price`, authJwt.verifyToken, controller.deleteAll);

  app.post(
    `${api.URL}/pricelist`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreateList],
    controllerList.create
  );
  app.get(`${api.URL}/pricelist`, authJwt.verifyToken, controllerList.findAll);
  app.get(
    `${api.URL}/pricelist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.findOne
  );
  app.patch(
    `${api.URL}/pricelist/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdateList],
    controllerList.update
  );
  app.delete(
    `${api.URL}/pricelist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.delete
  );
  app.delete(
    `${api.URL}/pricelist`,
    authJwt.verifyToken,
    controllerList.deleteAll
  );
  app.post(
    `${api.URL}/pricelisturl`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreateListUrl],
    controllerListUrl.create
  );
  app.get(
    `${api.URL}/pricelisturl`,
    authJwt.verifyToken,
    controllerListUrl.findAll
  );
  app.get(
    `${api.URL}/pricelisturl/:id`,
    [authJwt.verifyToken, validateOneListUrl],
    controllerListUrl.findOne
  );
  app.patch(
    `${api.URL}/pricelisturl/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdateListUrl],
    controllerListUrl.update
  );
  app.delete(
    `${api.URL}/pricelisturl/:id`,
    [authJwt.verifyToken, validateOneListUrl],
    controllerListUrl.delete
  );
  app.delete(
    `${api.URL}/pricelisturl`,
    authJwt.verifyToken,
    controllerListUrl.deleteAll
  );
};
