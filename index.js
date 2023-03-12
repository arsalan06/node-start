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
app.use("/api/v1/tours", toursRouter);
app.all("*", (req, res)=>{
  res.status({
    status:"fail",
    message:`can't find ${req.originalUrl} on this server`
  })
})
module.exports = app;
