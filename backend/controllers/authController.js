const emailValidation = require("../helpers/emailvalidation");
const sendEmail = require("../helpers/sendEmail");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

// SignUp controller
const SignupController = async (req, res) => {
  let { username, email, password } = req.body;

  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || "something want wrong",
        });
      } else {
        if (!emailValidation(email)) {
          return res
            .status(400)
            .json({ success: false, message: "email is not valid" });
        }

        let user = new userModel({
          username,
          email,
          password: hash,
        });

        await user.save();
        sendEmail(email);
        return res
          .status(200)
          .json({ success: true, message: "user created successfully", user });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "something want wrong",
    });
  }
};

// SignIn controller
const SigninController = async (req, res) => {
  res.send("Login user route");
};

module.exports = { SignupController, SigninController };
