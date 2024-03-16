const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);

const app = express();

const store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/admin",
  collection: "sessions",
});
app.use(
  session({
    secret: "xayotbek",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/register", (req, res) => res.render("register", { isError: false }));
app.get("/login", (req, res) => res.render("login"));
app.get("/dashboard", (req, res) => res.render("dashboard"));

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await userModel.findOne({
      email,
    });
    req.session.user = {
      email: data.email,
      id: data._id,
    };
    if (!data) return res.redirect("/register");
    if (data.password != password) return res.redirect("/register");
    console.log(data);
    res.redirect("dashboard");
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await userModel.create({
      email,
      password,
    });
    req.session.user = {
      email: data.email,
      id: data._id,
    };

    res.render("login");
  } catch (error) {
    res.render("register", { isError: true });
  }
});

app.post("logout", async (req, res) => {
  req.session.destroy();

  req.redirect("/register");
});

app.listen(8080, async () => {
  await mongoose.connect("mongodb://localhost:27017/admin");
  console.log("Server is running on port 8080");
});
