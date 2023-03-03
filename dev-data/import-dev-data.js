require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const DB = process.env.DATABASE_URI;
const Tour = require("../models/tourModel");
const toursFile = require("./tours.json");
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected successful!");
  });

// Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data is successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data deleted successfully");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
