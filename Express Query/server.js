const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log(`URl ${req.url} method ${req.method}`);
  return next();
});

app.use(express.json());

// app.get("/user/:id", (req, res) => {
//   const { id } = req.params;
//   res.status(200).json({
//     status: "success",
//     data: users.filter((user) => user.id == id)[0],
//   });
// });
// app.get("", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     data: users,
//   });
// });
// app.post("/", async (req, res) => {
//   users.push({ id: uuid.v4(), ...req.body });
//   res.status(201).json({
//     status: "success",
//   });
// });
// app.put("/:id", async (req, res) => {
//   const { id } = req.params;

//   users.map((user) => (user.id == id ? { ...value, ...req.body } : value));
//   res.status(201).json({
//     status: "success",
//   });
// });
// app.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   users = users.filter((user) => user.id != id);
//   res.status(201).json({
//     status: "success",
//   });
// });

// URL configuration

app.use(require("./routes"));

app.listen(3000, () => {
  console.log("Server listening on port http://localhost:3000");
});
