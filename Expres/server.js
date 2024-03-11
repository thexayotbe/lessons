const express = require("express");
const uuid = require("uuid");
const fs = require("fs");
let user_data = require("./lib/data.json");

const bodyHandler = async (data, required) => {
  let result = "Please enter";
  required.map((value) =>
    Object.keys(JSON.parse(data)).includes(value)
      ? value
      : (result += ` ${value}`)
  );

  if (result === "Please enter") return null;

  throw new Error(result);
};

const idCheck = async (_id) => {
  let foundUser = user_data.find((user) => user._id === _id);
  if (!foundUser) throw new Error("User not found");
};

const app = express();

app.listen(3000, () => {
  console.log("Server listening on port http://localhost:3000");
});
app.use((req, res, next) => {
  console.log(`URl ${req.url} method ${req.method}`);
  return next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: user_data,
  });
});
app.post("/", async (req, res) => {
  try {
    await bodyHandler(JSON.stringify(req.body), ["name", "surname", "city"]);
    user_data.push({ _id: uuid.v4(), ...req.body });
    fs.writeFileSync("./lib/data.json", JSON.stringify(user_data));
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});
app.put("/", async (req, res) => {
  try {
    await bodyHandler(JSON.stringify(req.body), ["_id"]);
    const { _id } = req.body;
    await idCheck(_id);
    user_data = user_data.map((value) => {
      return value._id == _id ? { ...value, ...req.body } : value;
    });
    fs.writeFileSync("./lib/data.json", JSON.stringify(user_data));
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});
app.delete("/", async (req, res) => {
  try {
    await bodyHandler(JSON.stringify(req.body), ["_id"]);
    const { _id } = req.body;
    await idCheck(_id);
    user_data = user_data.filter((value) => value._id !== _id);
    fs.writeFileSync("./lib/data.json", JSON.stringify(user_data));
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});
