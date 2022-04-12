const { authJwt } = require("../middleware");
const controller = require("../controllers/message.controller");
const uploadFilesMiddleware = require("../middleware/upload");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreate,
  validateByInvitationId
} = require("../middleware/validation/messageValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(`${api.URL}/message`, [validateCreate], controller.create);
  app.get(`${api.URL}/message`, authJwt.verifyToken, controller.findAll);
  app.get(
    `${api.URL}/message/:id`,
    [authJwt.verifyToken, validateOne],
    controller.findOne
  );
  app.get(
    `${api.URL}/message-invitation/:id`,
    [validateByInvitationId],
    controller.findByInvitationId
  );
  app.patch(
    `${api.URL}/message/:id`,
    [uploadFilesMiddleware, authJwt.verifyToken, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/message/:id`,
    [authJwt.verifyToken, validateOne],
    controller.delete
  );
  app.delete(`${api.URL}/message`, authJwt.verifyToken, controller.deleteAll);
};
