const { authJwt } = require("../middleware");
const controller = require("../controllers/loveStory.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreate,
} = require("../middleware/validation/loveStoryValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(`${api.URL}/lovestory`, [authJwt.verifyToken]);
  app.get(`${api.URL}/lovestory`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/lovestory/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.patch(
    `${api.URL}/lovestory/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/lovestory/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/lovestory`, authJwt.verifyToken, controller.deleteAll);
};
