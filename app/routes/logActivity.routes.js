const { authJwt } = require("../middleware");
const controller = require("../controllers/logActivity.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(`${api.URL}/logactivity`, controller.create);
  app.get(`${api.URL}/logactivity`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/logactivity/:id`,
    authJwt.verifyToken,
    controller.findOne
  );
  app.patch(
    `${api.URL}/logactivity/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken],
    controller.update
  );
  app.delete(
    `${api.URL}/logactivity/:id`,
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    `${api.URL}/logactivity`,
    authJwt.verifyToken,
    controller.deleteAll
  );
};
