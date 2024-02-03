const { Schema, default: mongoose } = require("mongoose");

const migrantSchema = new Schema({
  name: String,
  surname: String,
  visa_expiration: Date,
});

module.exports = mongoose.model("migrants", migrantSchema);
