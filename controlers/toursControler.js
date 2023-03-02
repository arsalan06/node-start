const Tour = require("../models/tourModel");

exports.getAllTours = (req, res) => {
  res.status(201).json({ message: "All Tours Avialable" });
};
exports.postAllTours = (req, res) => {
  res.status(201).json({ message: "post Tours Avialable" });
};
