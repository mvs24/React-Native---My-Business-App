const User = require("../models/userModel");
const Business = require("../models/businessModel");
const asyncWrapper = require("../utils/asyncWrapper");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    data: users,
  });
};

exports.hasBusiness = asyncWrapper(async (req, res, next) => {
  const business = await Business.findOne({ user: req.user.id });

  if (business) {
    res.status(200).json({
      status: "success",
      data: true,
    });
  } else {
    res.status(200).json({
      status: "success",
      data: false,
    });
  }
});
