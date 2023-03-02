const express = require("express");

const toursControler = require("../controlers/toursControler");

const { getAllTours, postAllTours, getTour, updateTour, deleteTour } = toursControler;

// =====> one way to define routes

// app.get("/all-tours", getAllTours);
// app.get("/all-tours", postAllTours);

// =====> second way to define routes

// app.route("/all-tours").get(getAllTours).post(postAllTours);

// =====> Third way to define monting routes
const toursRouter = express.Router();

toursRouter.route("/").get(getAllTours).post(postAllTours);
toursRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = toursRouter;
