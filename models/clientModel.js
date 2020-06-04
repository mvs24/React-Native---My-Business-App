const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A client must have a name"],
    unique: true,
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: "Business",
  },
  totalSum: {
    type: Number,
    default: 0,
  },
  rewards: {
    type: Number,
    default: 0,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
