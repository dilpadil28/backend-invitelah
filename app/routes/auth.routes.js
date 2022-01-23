const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const api = require("../config/api");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `${api.URL}/auth/signup`,
    [
      verifySignUp.checkDuplicateUsernamePhoneNumberOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post(`${api.URL}/auth/signin`, controller.signin);

  app.post(`${api.URL}/auth/refreshtoken`, controller.refreshToken);
};
