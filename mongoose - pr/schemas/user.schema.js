const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    // required: true,
    // lowercase: true,
    // uppercase: true,
    // minLength: 10,
    // maxLength: 255,
  },
  surname: String,
});

module.exports = mongoose.model("users", userSchema);
