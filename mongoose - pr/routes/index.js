const { Router } = require("express");

const plantsModule = require("../schemas/plants.schema");
const router = Router();

router.get("/plants", async (req, res) => {
  return res.status(200).json({
    message: "success",
    data: await plantsModule.find(),
  });
});
router.post("/plants", async (req, res) => {
  const { image, title, description, type } = req.body;
  await plantsModule.create({ image, title, description, type });
  return res.status(201).json({
    message: "success",
  });
});

router.delete("/plants/:_id", async (req, res) => {
  const { _id } = req.params;
  await plantsModule.deleteOne({ _id });
  return res.status(201).json({
    message: "success",
  });
});

router.put("/plants/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  await plantsModule.replaceOne({ _id }, { ...data });
  return res.status(201).json({
    message: "success",
  });
});

module.exports = router;
