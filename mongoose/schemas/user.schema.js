const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: String,
  surname: String,
});

module.exports = mongoose.model("users", userSchema);
