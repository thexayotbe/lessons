const { Router } = require("express");

const plantsModule = require("../schemas/plants.schema");
const router = Router();

router.get("/flower/:type", async (req, res) => {
  try {
    return res.status(200).json({
      message: "success",
      data: await plantsModule[req.params.type].find(),
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
});
router.post("/flower/:type", async (req, res) => {
  const { image, title, description, type } = req.body;
  try {
    await plantsModule[req.params.type].create({
      image,
      title,
      description,
      type,
    });
    return res.status(201).json({
      message: "success",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
});

router.delete("/flower/:type/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await plantsModule[req.params.type].deleteOne({ _id });
    return res.status(201).json({
      message: "success",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
});
router.put("/flower/:type/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  try {
    await plantsModule[req.params.type].replaceOne({ _id }, { ...data });
    return res.status(201).json({
      message: "success",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
});

module.exports = router;
