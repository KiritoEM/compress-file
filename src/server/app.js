const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const dotenv = require("dotenv").config();
const multer = require("multer");

// App middlewares
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

// App routes
// app.use("/auth", require("./../routes/Auth.routes"));
// app.use("/chat", require("./../routes/chat.routes"));

module.exports = app;
