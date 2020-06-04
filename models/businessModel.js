const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A businnes must have a name"],
    unique: true,
  },
  priceRewards: {
    type: [Number],
    required: [true, "A businnes must have prices of rewards specified!"],
  },
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
