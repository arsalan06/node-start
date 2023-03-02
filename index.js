require("dotenv").config();
const express = require("express");
var bodyParser = require('body-parser')
const toursRouter = require("./routes/toursRoutes");
const app = express();
app.use(bodyParser.json())
app.get("/", (req, res) => {
  res.status(201).json({ message: "hello world" });
});

app.use("/api/v1/all-tours", toursRouter);

module.exports = app;
