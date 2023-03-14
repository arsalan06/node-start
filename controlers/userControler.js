const User = require("../models/userModel");
// const catchAsync = require("../utils/catchAsync");
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("inside user controler")
    console.log("inside user controler")
    console.log(users.length)
    return res.status(201).json({
      status: "success",
      data: {
        users: users,
      },
    });
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};
