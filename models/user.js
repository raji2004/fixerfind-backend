const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: "Hello stranger",
    trim: true,
    text: true,
  },
  phone_no: {
    type: String,
    required: [true, "phone number is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    text: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    min: 6,
    max: 12,
    text: true,
  },
  country: {
    type: String,
    default: "Nigeria",
    trim: true,
    text: true,
  },
  verified:{
    type: Boolean,
    default: false
  },
  info:{
    code:{
      type: String,
      text: true,
      trim: true,
    }
  },
  description: {
    type: String,
    default: "tell the community about yourself",
    trim: true,
    text: true,
  },
});
module.exports = mongoose.model("User", userSchema);
