const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
    text: true,
  },
  Firstname: {
    type: String,
    default: "FixerFinder",
    trim: true,
    text: true,
  },
  Lastname: {
    type: String,
    default: "....",
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
    unique: true,
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
  verified: {
    type: Boolean,
    default: false,
  },

  code: {
    type: String,
    text: true,
    trim: true,
    unique: true,
  },
  time: {
    type: String,

  },
  description: {
    type: String,
    default: "tell the community about yourself",
    trim: true,
    text: true,
  },
});
module.exports = mongoose.model("User", userSchema);
