const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  else {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ username: this.username }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESSTOKEN_EXPIRY,
  });
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ username: this.username }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESHTOKEN_EXPIRY,
  });
};
const user = mongoose.model("user", userSchema);
module.exports = { user };
