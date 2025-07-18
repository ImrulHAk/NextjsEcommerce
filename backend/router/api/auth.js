const express = require("express");
const {
  SignupController,
  SigninController,
  CheakotpController,
} = require("../../controllers/authController");
const router = express.Router();

// localhost:9988/api/auth/signup
// signup user
router.post("/signup", SignupController);

// cheak otp
router.post("/cheakotp", CheakotpController);

// login user
router.post("/login", SigninController);

module.exports = router;
