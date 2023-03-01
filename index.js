require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(201).json({ message: "hello world" });
});
const getAllTours = (req, res) => {
  res.status(201).json({ message: "All Tours Avialable" });
};
const postAllTours = (req, res) => {
  res.status(201).json({ message: "post Tours Avialable" });
};

// =====> one way to define routes

// app.get("/all-tours", getAllTours);
// app.get("/all-tours", postAllTours);

// =====> second way to define routes

// app.route("/all-tours").get(getAllTours).post(postAllTours);

// =====> Third way to define routes
const toursRouter = express.Router();
app.use("/api/v1/all-tours", toursRouter);
toursRouter.route("/").get(getAllTours).post(postAllTours);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
