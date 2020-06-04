const factory = require("./handlerFactory");
const Business = require("../models/businessModel");
const asyncWrapper = require("../utils/asyncWrapper");
const AppError = require("../utils/AppError");
const Client = require("../models/clientModel");

exports.getBusiness = factory.getOne(Business);
exports.createBusiness = factory.createOne(Business);

exports.getCurrentBusiness = asyncWrapper(async (req, res, next) => {
  const business = await Business.findOne({ user: req.user._id });

  if (!business) {
    return next(
      new AppError("There is no business belonging to this user!", 404)
    );
  }

  req.business = business;

  next();
});

exports.getCurrentUserBusiness = asyncWrapper(async (req, res, next) => {
  const business = await Business.findOne({ user: req.user._id });

  if (!business) {
    return next(
      new AppError("There is no business belonging to this user!", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: business,
  });
});

exports.setBusiness = (req, res, next) => {
  req.body.business = req.business._id;
  next();
};

exports.getTopClients = asyncWrapper(async (req, res, next) => {
  console.log(req.business.clients);
  const sortedClients = req.business.clients.sort(
    (cl1, cl2) => !(cl1.rewards - cl2.rewards)
  );

  res.status(200).json({
    status: "success",
    data: sortedClients,
  });
});
