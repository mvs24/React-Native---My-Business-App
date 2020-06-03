const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    maxlength: [20, "Name can not be at more than 20 characters"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "A user must have a lastname"],
    maxlength: [20, "Lastname can not be at more than 20 characters"],
    trim: true,
  },
  photo: String,
  email: {
    type: String,
    required: [true, "A user must have an email"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "A password must be at least 6 characters"],
    required: [true, "A password must be at least 6 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    minlength: [6, "Password Confirm must be at least 6 characters"],
    required: [true, "Password Confirm must be at least 6 characters"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password Confirm is not correct",
    },
  },
  passwordChangedAt: Date,
});

userSchema.methods.correctPassword = async function (
  currentPassword,
  userPassword
) {
  return await bcrypt.compare(currentPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  console.log(JWTTimestamp);
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
