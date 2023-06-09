const mongoose = require("mongoose");

const Otp = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: Date,
});

module.exports = mongoose.model("MailOtp", Otp);
