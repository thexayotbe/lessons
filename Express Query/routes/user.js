const { Router } = require("express");

const router = Router();

// User
router.get("/", (req, res) => res.send("Hello from User Get"));
router.put("/", (req, res) => res.send("Hello from User Put"));
router.post("/", (req, res) => res.send("Hello from User Post"));
router.delete("/", (req, res) => res.send("Hello from User Delete"));

module.exports = router;
