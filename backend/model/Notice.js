const mongoose = require("mongoose");

const Notice = mongoose.Schema({
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
  hospital: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Notice", Notice);
