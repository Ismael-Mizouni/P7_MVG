

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const booksRoutes = require("./routes/booksRoutes");
const usersRoutes = require("./routes/usersRoutes");
require('dotenv').config()
const uri = process.env.DB_URI;

console.log(require("dotenv").config())

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/books", booksRoutes);
app.use("/api/auth", usersRoutes);

module.exports = app;
