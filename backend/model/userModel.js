const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minlength: [3, "username must be more than 3 characters"],
      maxlength: [20, "username must be less than 20 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "this email already exists"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be more than 6 characters"],
    },
    profilePic: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
      maxlength: [20, "phone number must be less then 20 characters"],
      minlength: [9, "phone number must be more then 9 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerify: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
