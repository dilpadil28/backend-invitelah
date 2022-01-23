const { authJwt } = require("../middleware");
const controller = require("../controllers/userTest.controller");
const api = require("../config/api");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(`${api.URL}/test/all`, controller.allAccess);

  app.get(`${api.URL}/test/user`, [authJwt.verifyToken], controller.userBoard);

  app.get(
    `${api.URL}/test/mod`,
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    `${api.URL}/test/admin`,
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
