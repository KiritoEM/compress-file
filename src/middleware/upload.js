const path = require("path");
const multer = require("multer");

//storage of file
let storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, "fichier_to_compressed/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

//upload file
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

module.exports = upload;
