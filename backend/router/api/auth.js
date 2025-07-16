const express = require("express");
const {
  SignupController,
  SigninController,
} = require("../../controllers/authController");
const router = express.Router();

// localhost:9988/api/auth/signup
// signup user
router.post("/signup", SignupController);

// login user
router.post("/login", SigninController);

module.exports = router;
