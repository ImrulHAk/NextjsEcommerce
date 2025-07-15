const express = require("express");
const router = express.Router();

// localhost:3000/api/auth/signup
//signup user
router.post("/signup", (req, res) => {
  res.send("Signup user router");
});

module.exports = router;
