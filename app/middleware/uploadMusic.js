const util = require("util");
const path = require("path");
const multer = require("multer");
var maxSize = 5 * 1024 * 1024;

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload/files/songs");
  },
  filename: (req, file, callback) => {
    const match = ["audio/mpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept mp3/wav.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-invitelah-${file.originalname}`;
    callback(null, filename);
  },
});

var uploadFiles = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("song");

var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
