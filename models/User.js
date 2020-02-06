const mongoose = require("mongoose");
const crypto = require("crypto");

//User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 50
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      max: 100
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "subscriber"
    },
    resetPasswordLink: {
      data: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
