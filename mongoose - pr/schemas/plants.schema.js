const { Schema, default: mongoose } = require("mongoose");

const plantsModule = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["gardening", "domestic", "homepot"],
  },
});

module.exports = {
  gardening: mongoose.model("gardening", plantsModule),
  domestic: mongoose.model("domestic", plantsModule),
  homepot: mongoose.model("homepot", plantsModule),
};
