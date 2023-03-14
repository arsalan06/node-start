const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
// const { promisify } = require("util");
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
    // console.log(user);
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

exports.protect = async (req, res, next) => {
  // 1) get the token if it exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new appError("your are not logged in to get access.", 401));
  }
  //2) verification token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //3) check this user exists
    const userExist = await User.findById(decoded.id);
    console.log(userExist);
    if(userExist){
      next();
    }else{
      return next(new appError("This user is not exist.", 401));
    }
  } catch (err) {
    console.log(err);
    return next(new appError(err, 401));
  }

};
