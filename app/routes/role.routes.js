const { authJwt } = require("../middleware");
const controller = require("../controllers/role.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
} = require("../middleware/validation/roleValidation");
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
    `${api.URL}/role`,
    [authJwt.verifyToken, validateName],
    controller.create
  );
  app.get(`${api.URL}/role`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/role/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.put(
    `${api.URL}/role/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/role/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/role`, authJwt.verifyToken, controller.deleteAll);
};
