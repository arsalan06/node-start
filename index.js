require("dotenv").config();
const express = require("express");
const toursRouter = require("./routes/toursRoutes");
const app = express();

app.get("/", (req, res) => {
  res.status(201).json({ message: "hello world" });
});

app.use("/api/v1/all-tours", toursRouter);

module.exports = app;
