require("dotenv").config();
const express = require("express");
var bodyParser = require('body-parser')
const toursRouter = require("./routes/toursRoutes");
const app = express();
const AppClass =require("./utils/appError")
app.use(bodyParser.json())
app.get("/", (req, res) => {
  res.status(201).json({ message: "hello world" });
});

// app.use("/api/v1/all-tours", toursRouter);
app.use("/api/v1/tours", toursRouter);
app.all("*", (req, res, next)=>{
  // res.status(404).json({
  //   status:"fail",
  //   message:`can't find ${req.originalUrl} on this server`
  // })
  // const err =new Error(`can't find ${req.originalUrl} on this server`);
  // err.status="fail";
  // err.statusCode=404;
  // next(err)
  next(new AppClass(`can't find ${req.originalUrl} on this server`))
})
app.use((err, req, res, next)=>{
  err.statusCode=err.statusCode || 500
  err.status=err.status || "error"
  res.status(err.statusCode).json({
    status: err.status,
    message:err.message
  })
})
module.exports = app;
