const express = require("express");

const userControler = require("../controlers/userControler");
const authControler = require("../controlers/authControler");
const {signup, login}=authControler;
const {getAllUsers}=userControler;
const userRouter = express.Router();
 
userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.route("/").get(getAllUsers)
// toursRouter.route("/filter").get(getfilterTours)
// toursRouter.route("/sortedBy").get(getSortedTours)
// toursRouter.route("/limitedField").get(getLimitedTours)
// toursRouter.route("/top-5-cheap").get(aliasTopTours, getfilterTours)
// toursRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = userRouter;
