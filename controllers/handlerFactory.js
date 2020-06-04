const asyncWrapper = require("../utils/asyncWrapper");
const AppError = require("../utils/AppError");

exports.getOne = (Model) =>
  asyncWrapper(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("This document does not exist", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model) =>
  asyncWrapper(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
