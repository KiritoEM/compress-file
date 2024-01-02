const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const dotenv = require("dotenv").config();
const multer = require("multer");
const upload = require("./../middleware/upload");
const fs = require("fs");
const zlib = require("zlib");
const archiver = require("archiver");

// App middlewares
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.post("/compress", upload.single("file"), (req, res) => {
  if (req.file) {
    console.log("file uploaded.", req.file);
  }
  const file_name = req.file.filename;
  const file_source = fs.createReadStream(
    `./fichier_to_compressed/${file_name}`
  );
  const file_destination = fs.createWriteStream(
    `./fichier_compressé/${file_name}.zip`
  );
  const gzip = zlib.createGzip();
  let response = file_source.pipe(gzip).pipe(file_destination);

  if (response) {
    res.status(200).json("Fichier compressé avec succés");
  }
});

module.exports = app;
