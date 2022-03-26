const { body, validationResult, param } = require("express-validator");
const { invitation, invitationType } = require("../../db/models");
module.exports = {
  validateCreate: [
    body("slug")
      .notEmpty()
      .withMessage("Slug is required")
      .bail()
      .custom((value) => {
        return invitation.findOne({ where: { slug: value } }).then((slug) => {
          if (slug) {
            return Promise.reject();
          }
        });
      })
      .withMessage("Failed! Slug is already in use!"),
    body("namaPria").notEmpty().withMessage("Nama Pria is required"),
    body("namaPendekPria").notEmpty().withMessage("Nama Pendek Pria is required"),
    body("namaOrangTuaPria").notEmpty().withMessage("Nama Orang Tua Pria is required"),
    body("namaWanita").notEmpty().withMessage("Nama Wanita is required"),
    body("namaPendekWanita").notEmpty().withMessage("Nama Pendek Wanita is required"),
    body("namaOrangTuaWanita").notEmpty().withMessage("Nama Orang Tua Wanita is required"),
    body("tanggalNikah").notEmpty().withMessage("Tanggal Nikah is required"),
    body("jamNikah").notEmpty().withMessage("Jam Nikah is required"),
    body("alamatNikah").notEmpty().withMessage("Alamat Nikah is required"),
    body("mapsNikah").notEmpty().withMessage("maps Nikah is required"),
    body("tanggalResepsi").notEmpty().withMessage("Tanggal Resepsi is required"),
    body("jamResepsi").notEmpty().withMessage("Jam Resepsi is required"),
    body("alamatResepsi").notEmpty().withMessage("Alamat Resepsi is required"),
    body("mapsResepsi").notEmpty().withMessage("maps Resepsi is required"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],
  validateOne: [
    param("id")
      .notEmpty()
      .withMessage("param is required")
      .isNumeric()
      .withMessage("id must be an number")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await invitation.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],
  validateUpdate: [
    param("id")
      .notEmpty()
      .withMessage("param is required")
      .isNumeric()
      .withMessage("id must be an number")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await invitation.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    body("slug").notEmpty().withMessage("Slug is required"),
    body("namaPria").notEmpty().withMessage("Nama Pria is required"),
    body("namaPendekPria").notEmpty().withMessage("Nama Pendek Pria is required"),
    body("namaOrangTuaPria").notEmpty().withMessage("Nama Orang Tua Pria is required"),
    body("namaWanita").notEmpty().withMessage("Nama Wanita is required"),
    body("namaPendekWanita").notEmpty().withMessage("Nama Pendek Wanita is required"),
    body("namaOrangTuaWanita").notEmpty().withMessage("Nama Orang Tua Wanita is required"),
    body("tanggalNikah").notEmpty().withMessage("Tanggal Nikah is required"),
    body("jamNikah").notEmpty().withMessage("Jam Nikah is required"),
    body("alamatNikah").notEmpty().withMessage("Alamat Nikah is required"),
    body("mapsNikah").notEmpty().withMessage("maps Nikah is required"),
    body("tanggalResepsi").notEmpty().withMessage("Tanggal Resepsi is required"),
    body("jamResepsi").notEmpty().withMessage("Jam Resepsi is required"),
    body("alamatResepsi").notEmpty().withMessage("Alamat Resepsi is required"),
    body("mapsResepsi").notEmpty().withMessage("maps Resepsi is required"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],
  validateOneType: [
    param("id")
      .notEmpty()
      .withMessage("param is required")
      .isNumeric()
      .withMessage("id must be an number")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await invitationType.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],
  validateUpdateType: [
    param("id")
      .notEmpty()
      .withMessage("param is required")
      .isNumeric()
      .withMessage("id must be an number")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await invitationType.findOne({
          where: { id: value },
        });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage("param id not found"),
    body("title").notEmpty().withMessage("title is required"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],
};
