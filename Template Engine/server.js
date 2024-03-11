const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

app.use(express.static(path.join(__dirname, "public", "styles")));

app.engine(
  ".html",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    extname: ".html",
  })
);
app.set("view engine", "html");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", {
    layout: "main",
    title: "Home page",
    isActive: true,
    person: {
      name: "John",
      surname: "Doe",
      phoneNumber: "123",
    },
    vages: [
      {
        name: "John",
        surname: "Doe",
        phoneNumber: "123",
        skills: ["Html", "Css", "JavaScript"],
      },
      {
        name: "John",
        surname: "Doe",
        phoneNumber: "123",
        skills: ["Html", "Css", "JavaScript"],
      },
      {
        name: "John",
        surname: "Doe",
        phoneNumber: "123",
        skills: ["Html", "Css", "JavaScript"],
      },
    ],
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "main",
    title: "About",
  });
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
