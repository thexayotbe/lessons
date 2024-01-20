const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    name: "Jake",
    surname: "Dare",
    listVeg: ["banana", "orange", "apple", "watermelon"],
    isShow: false,
  });
});

app.listen(8080, () => {
  console.log("Running on port http://localhost:8080");
});
