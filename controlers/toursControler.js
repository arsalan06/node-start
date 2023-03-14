const { query } = require("express");
const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");
// class APIFeatures{
//   constructor(query, queryString){
//     this.query=query;
//     this.queryString=queryString;
//   }
//   filter(){
//        const queryObj = { ...req.query };
//     const excludeFields = ["page", "sort", "limit", "fields"];
//     excludeFields.forEach((el) => delete queryObj[el]);

//     // 2) Advance filtering
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//     const query = Tour.find(JSON.parse(queryStr));
//   }
// }

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "3";
  req.query.sort - "-ratingAverage, price";
  req.query.fields = "name, price, ratingAverage, summary difficulty";
  next();
};
exports.getfilterTours = async (req, res) => {
  try {
    // console.log(req.query);
    // const { duration, difficulty } = req.query;
    // 1) => filtering
    // how exclude params from req.query
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    // one way to filter the record in mongodb
    // const query = Tour.find(queryObj);

    // second way to filter the record in mongodb

    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals(duration)
    //   .where("difficulty")
    //   .equals(difficulty);

    // 2) Advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = Tour.find(JSON.parse(queryStr));
    const tours = await query;

    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getAllTours = catchAsync( async (req, res, next) => {
    const tours = await Tour.find();
    res.json({
      status: "success",
      // result: tours.length,
      // data: tours,
    }) 
});
exports.getSortedTours = async (req, res) => {
  try {
    // console.log(req.query);
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));
    if (req.query.sort) {
      //sort record with single filter

      // query=query.sort(req.query.sort)
      // sort record with multiple filters
      const sortBy = req.query.sort.split(",").join(" ");
      // console.log(sortBy)
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    const tours = await query;

    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getLimitedTours = async (req, res) => {
  try {
    // field limitation
    // this proccess is called projecting
    let tours;
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   console.log(fields);
    //   // console.log(query);
    //   tours = await Tour.find().select(fields);
    // }
    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    //page=2&limit=10, 1-10, page 1, 11-20 page 2, 21-30 page 3 and so on
    // query = query.skip(skip).limit(limit);
    tours = await Tour.find().skip(skip).limit(limit);

    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.postAllTours = catchAsync(async (req, res) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({ status: "success", data: { tour: newTour } });
});

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(201).json({ status: "success", data: { tour } });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ status: "success", data: { tour } });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findOneAndDelete(req.params.id, {
      new: true,
    });
    res.status(201).json({ status: "success", data: { tour } });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
