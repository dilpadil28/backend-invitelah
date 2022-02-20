const { authJwt } = require("../middleware");
const controller = require("../controllers/faq.controller");
const controllerList = require("../controllers/faqList.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreateList,
  validateOneList,
  validateUpdateList,
} = require("../middleware/validation/faqValidation");
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
    `${api.URL}/faq`,
    [authJwt.verifyToken, validateTitle],
    controller.create
  );
  app.get(`${api.URL}/faq`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/faq/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.patch(
    `${api.URL}/faq/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/faq/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/faq`, authJwt.verifyToken, controller.deleteAll);

  app.post(
    `${api.URL}/faqlist`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateCreateList],
    controllerList.create
  );
  app.get(`${api.URL}/faqlist`, authJwt.verifyToken, controllerList.findAll);
  app.get(
    `${api.URL}/faqlist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.findOne
  );
  app.patch(
    `${api.URL}/faqlist/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdateList],
    controllerList.update
  );
  app.delete(
    `${api.URL}/faqlist/:id`,
    [authJwt.verifyToken, validateOneList],
    controllerList.delete
  );
  app.delete(
    `${api.URL}/faqlist`,
    authJwt.verifyToken,
    controllerList.deleteAll
  );
};
