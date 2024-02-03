const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./schemas/user.schema");
const migrantModel = require("./schemas/migrant.schema");
const app = express();

app.get("/", async (req, res) => {
  await userModel.create({
    name: 123,
    surname: "John",
  });
  res.status(200).json({
    message: "Working",
    users: await userModel.find(),
    migrants: await migrantModel.find(),
  });
});

app.listen(8080, async () => {
  await mongoose.connect("mongodb://localhost:27017/admin");

  console.log(await userModel.find());
  console.log(await migrantModel.find());
  console.log(
    " Connection established and listening on port http://localhost:8080"
  );
});
