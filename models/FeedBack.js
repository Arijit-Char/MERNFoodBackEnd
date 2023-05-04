//jshint esversion:6
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  feedback: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("feedback", feedbackSchema);
