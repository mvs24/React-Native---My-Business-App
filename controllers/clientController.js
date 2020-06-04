const factory = require("./handlerFactory");
const Client = require("../models/clientModel");
const asyncWrapper = require("../utils/asyncWrapper");
const AppError = require("../utils/AppError");

exports.createClient = factory.createOne(Client);

exports.updateClient = asyncWrapper(async (req, res, next) => {
  const client = await Client.findById(req.params.clientId);

  if (req.business._id.toString() !== client.business.toString()) {
    return next(
      new AppError("This user does not belong to this business", 400)
    );
  }
  const { sumToAdd } = req.body;
  client.totalSum += sumToAdd * 1;

  await client.save();

  if (client.totalSum >= req.business.priceRewards[0]) {
    res.status(200).json({
      status: "success",
      data: client,
      successMessage: "This client has reached one of your prices!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: client,
    });
  }
});

exports.giveReward = asyncWrapper(async (req, res, next) => {
  const { priceReward } = req.body;
  const client = await Client.findById(req.params.clientId);

  if (req.business._id.toString() !== client.business.toString()) {
    return next(
      new AppError("This user does not belong to this business", 400)
    );
  }

  console.log(client.totalSum, priceReward * 1);

  if (client.totalSum >= priceReward * 1) {
    client.rewards += 1;
    client.totalSum -= priceReward;
    await client.save();

    res.status(200).json({
      status: "success",
      data: client,
    });
  } else {
    return next(new AppError("This client has not reached that reward! "));
  }
});
