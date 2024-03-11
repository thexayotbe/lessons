const { Schema, default: mongoose } = require("mongoose");

const migrantSchema = new Schema({
  name: String,
  surname: String,
  visa_expiration: {
    type: Date,
    default: () => Date.now(),
    imutable: true,
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value % 2,
      message: ({ value }) => `Given  ${value} is not acceptable`,
    },
  },
});

migrantSchema.methods.fullName = function () {
  return `${this.name} ${this.surname}`;
};

migrantSchema.statics.findX = function () {
  return this.find({ name: "Mansur" });
};

module.exports = mongoose.model("migrants", migrantSchema);
