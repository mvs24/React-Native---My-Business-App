const factory = require("./handlerFactory");
const Business = require("../models/businessModel");

exports.getBusiness = factory.getOne(Business);
exports.createBusiness = factory.createOne(Business);
