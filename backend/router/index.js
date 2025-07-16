const express = require("express");
const router = express.Router();
const api = require("./api");

// localhost:9988/api
// api route
router.use("/api", api);

// route not found middelware
router.use((req, res) => {
  return res.status(404).json({ success: false, message: "Router not found" });
});

module.exports = router;
