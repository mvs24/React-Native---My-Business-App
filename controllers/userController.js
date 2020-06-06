const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    data: users,
  });
};
