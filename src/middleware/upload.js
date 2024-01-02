const path = require("path");
const multer = require("multer");

//storage of file
let storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, "files_compressed/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

//upload file
let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/quicktime"
    ) {
      console.log("Fichier sauvegardé");
      callback(null, true);
    } else {
      console.log("Image (jpg/png) ou vidéo (mp4/quicktime) seulement");
      callback(null, false);
    }
  },
  //   limits: {
  //     fileSize: 1024 * 1024 * 50, //50mb
  //   },
});

module.exports = upload;
