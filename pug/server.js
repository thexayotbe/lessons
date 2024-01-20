const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    surname: "Dare",
    listVeg: ["banana", "orange", "apple", "watermelon"],
    isShow: false,
    person: {
      name: "Xayotbek",
      surname: "Mamajonov",
    },
    orderStatus: "Pending",
  });
});

app.listen(8080, () => {
  console.log("Running on port http://localhost:8080");
});
