const { authJwt } = require("../middleware");
const controller = require("../controllers/digitalEnvelope.controller");
const api = require("../config/api");
const {
  validateOne,
  validateUpdate,
  validateCreate,
} = require("../middleware/validation/digitalEnvelopeValidation");
const uploadFilesMiddleware = require("../middleware/upload");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(`${api.URL}/digitalenvelope`, [validateCreate], controller.create);
  app.get(
    `${api.URL}/digitalenvelope`,

    controller.findAll
  );
  app.get(`${api.URL}/digitalenvelope/:id`, validateOne, controller.findOne);
  app.put(
    `${api.URL}/digitalenvelope/:id`,
    [uploadFilesMiddleware, validateUpdate],
    controller.update
  );
  app.delete(
    `${api.URL}/digitalenvelope/:id`,
    [validateOne],
    controller.delete
  );
  app.delete(
    `${api.URL}/digitalenvelope`,

    controller.deleteAll
  );
};
