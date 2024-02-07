const { Router } = require("express");
const gardeningModule = require("../schemas/gardening.schema");
const domesticModule = require("../schemas/domestic.schema");
const hompotModule = require("../schemas/homepot.schema");
const router = Router();

// gardening
router.get("/gardening", async (req, res) => {
  return res.status(200).json({
    message: "success",
    data: await gardeningModule.find(),
  });
});
router.post("/gardening", async (req, res) => {
  const { image, title, description, type } = req.body;
  await gardeningModule.create({ image, title, description, type });
  return res.status(201).json({
    message: "success",
  });
});

router.delete("/gardening/:_id", async (req, res) => {
  const { _id } = req.params;
  await gardeningModule.deleteOne({ _id });
  return res.status(201).json({
    message: "success",
  });
});

router.put("/gardening/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  console.log(data, _id);
  await gardeningModule.replaceOne({ _id }, { ...data });
  return res.status(201).json({
    message: "success",
  });
});

// home pot
router.get("/homepot", async (req, res) => {
  return res.status(200).json({
    message: "success",
    data: await hompotModule.find(),
  });
});

router.post("/homepot", async (req, res) => {
  const { image, title, description, type } = req.body;
  await hompotModule.create({ image, title, description, type });
  return res.status(201).json({
    message: "success",
  });
});

// Domestic
router.get("/domestic", async (req, res) => {
  return res.status(200).json({
    message: "success",
    data: await domesticModule.find(),
  });
});

router.post("/domestic", async (req, res) => {
  const { image, title, description, type } = req.body;
  await domesticModule.create({ image, title, description, type });
  return res.status(201).json({
    message: "success",
  });
});

module.exports = router;
