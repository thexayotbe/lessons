const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => res.send("Hello from admin Get"));
router.put("/", (req, res) => res.send("Hello from admin Put"));
router.post("/", (req, res) => res.send("Hello from admin Post"));
router.delete("/", (req, res) => res.send("Hello from admin Delete"));

module.exports = router;
