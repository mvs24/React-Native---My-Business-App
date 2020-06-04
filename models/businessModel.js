const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A businnes must have a name"],
      unique: true,
    },
    priceRewards: {
      type: [Number],
      required: [true, "A businnes must have prices of rewards specified!"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A businnes must belong to a user!"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

businessSchema.virtual("clients", {
  ref: "Client",
  foreignField: "business",
  localField: "_id",
});

businessSchema.pre(/^findOne/, function (next) {
  this.populate("clients");

  next();
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
