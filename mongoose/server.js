const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./schemas/user.schema");
const migrantModel = require("./schemas/migrant.schema");
const app = express();

app.get("/", async (req, res) => {
  // await migrantModel.create({
  //   name: "Doe",
  //   surname: "John",
  //   age: 23,
  // });

  const migrant = await migrantModel.findById("65bf6dff70b0e54107446ac8");
  const xMigr = await migrantModel.findX();
  console.log(xMigr);
  console.log(migrant.fullName());

  res.status(200).json({
    message: "Working",
    users: await userModel.findById("65be175a3dbfe2864a67413e"),
    migrants: await migrantModel.find(),
  });
});

app.listen(8080, async () => {
  await mongoose.connect("mongodb://localhost:27017/admin");

  console.log(await userModel.find());
  console.log(await migrantModel.find());
  console.log("Connection established listening on port http://localhost:8080");
});
