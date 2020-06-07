const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const asyncWrapper = require("../utils/asyncWrapper");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

exports.signup = asyncWrapper(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    photo: req.body.photo,
  });

  const token = signToken(user._id);

  user.password = undefined;
  user.passwordConfirm = undefined;

  res.status(200).json({
    status: "success",
    data: user,
    token,
  });
});

exports.login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide an email and a password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("User does not exist", 404));
  }

  const token = signToken(user._id);

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: user,
    token,
  });
});

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access!", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("This user does not exist", 404));
  }

  req.user = currentUser;
  next();
};

exports.getCurrentUser = asyncWrapper(async (req, res, next) => {
  // console.log(req.us);
  const user = await User.findById(req.user.id);

  user.password = undefined;
  user.passwordConfirm = undefined;

  res.status(200).json({
    status: "success",
    data: user,
  });
});
