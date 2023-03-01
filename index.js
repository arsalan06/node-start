require("dotenv").config();
const express = require("express");
const toursRouter = require("./routes/toursRoutes")
const app = express();

app.get("/", (req, res) => {
  res.status(201).json({ message: "hello world" });
});



app.use("/api/v1/all-tours", toursRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
