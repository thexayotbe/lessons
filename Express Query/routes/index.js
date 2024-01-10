const { Router } = require("express");

const router = Router();

// User route

router.use("/user", require("./user"));

// Admin
router.use("/admin", require("./admin"));
module.exports = router;
