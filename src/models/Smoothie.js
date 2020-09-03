const mongoose = require("mongoose");

const SmoothieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Smoothie", SmoothieSchema);
