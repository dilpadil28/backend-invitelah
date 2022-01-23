const { authJwt } = require("../middleware");
const controller = require("../controllers/theme.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreate,
} = require("../middleware/validation/themeValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${api.URL}/theme`,
    [authJwt.verifyToken, validateCreate],
    controller.create
  );
  app.get(`${api.URL}/theme`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/theme/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.put(
    `${api.URL}/theme/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/theme/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/theme`, authJwt.verifyToken, controller.deleteAll);
};
