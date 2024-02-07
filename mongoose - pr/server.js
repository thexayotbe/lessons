const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes"));

app.listen(8080, async () => {
  await mongoose.connect("mongodb://localhost:27017/admin");

  console.log("Connection established listening on port http://localhost:8080");
});
