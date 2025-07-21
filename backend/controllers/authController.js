const { json } = require("express");
const emailValidation = require("../helpers/emailvalidation");
const Rendom_otp = require("../helpers/rendom-otp");
const sendEmail = require("../helpers/sendEmail");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SignUp controller
const SignupController = async (req, res) => {
  let { username, email, password } = req.body;

  try {
    const otp = Rendom_otp();
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
          otp,
        });

        await user.save();
        sendEmail(email, otp);

        setTimeout(async () => {
          await userModel
            .findOneAndUpdate({ email }, { otp: null })
            .then(() => {
              console.log("otp deleted");
            });
          user.save();
        }, 60000);

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

// cheakotp controller
const CheakotpController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpverify = await userModel.findOne({ email });

    if (otpverify.otp == otp) {
      otpverify.isVerify = true;
      otpverify.otp = null;

      await otpverify.save();

      return res
        .status(200)
        .json({ success: true, message: "Your email is verified" });
    } else {
      return res.status(400).json({ success: false, message: "invalid otp" });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "something want wrong",
    });
  }
};

// SignIn controller
const SigninController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await userModel.findone({ email });

    if (!existinguser) {
      return res
        .status(404)
        .json({ success: false, message: "wrong information" });
    } else {
      bcrypt.compare(password, existinguser.password, function (err, result) {
        if (!err) {
          if (result) {
            let userdata = {
              id: existinguser._id,
              email: existinguser.email,
              role: existinguser.role,
            };
            const token = jwt.sign({ userdata }, process.env.jwtsecret, {
              expiresIn: "1h",
            });
            res.cookie("token", token);
            return res.status(200).json({
              success: true,
              message: "Login successfull",
              data: userdata,
              token: token,
            });
          } else {
            return res
              .status(404)
              .json({ success: false, message: "invalid password" });
          }
        } else {
          return res.status(500).json({ success: false, message: err });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "something want wrong",
    });
  }
};

module.exports = { SignupController, SigninController, CheakotpController };
