const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
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