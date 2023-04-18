const mongoose = require("mongoose");

const History = mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    required: true,
  },
  alloted: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("History", History);