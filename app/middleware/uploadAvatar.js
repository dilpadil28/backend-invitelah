const util = require("util");
const path = require("path");
const multer = require("multer");
var maxSize = 2 * 1024 * 1024;

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload/images");
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpg/jpeg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-invitelah-${file.originalname}`;
    callback(null, filename);
  },
});

var uploadFiles = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("avatar");

var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
