const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have difficulty"],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    // select false is used to remove the field from get API record
    select: false,
  },
  startDates: [Date],
});
const Tour = mongoose.model("Tour", tourSchema);
//=====> for static data insert in model

//   const testTour = new Tour({
//     name: "The Park",
//   //   rating: 4.7,
//     price: 544,
//   });
// testTour
//   .save()
//   .then((document) => {
//     console.log(document);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
module.exports = Tour;
