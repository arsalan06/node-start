const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email or passord is not exist
  console.log(req.body);
  if (!email || !password) {
    return next(new appError("please provide email or password", 400));
  } else if (email && password) {
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    const correct = await user.correctPassword(password, user.password);
    if (!user || !correct) {
      return next(new appError("please provide valid email or password", 401));
    } else {
      const token = signToken(user._id);
      res.status(200).json({
        status: "success",
        token,
        // data: {},
      });
    }
  }
});
