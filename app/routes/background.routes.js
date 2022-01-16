const { authJwt } = require("../middleware");
const controller = require("../controllers/background.controller");
const uploadFilesMiddleware = require("../middleware/upload");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/background", [authJwt.verifyToken], controller.findAll);
  app.post("/api/background", [uploadFilesMiddleware], controller.create);
};
