const nodemailer = require("nodemailer");

async function sendEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail ",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Email verification code",
    text: "Hello world?", // plain‑text body
    html: `<b>Your email verification code is ${otp}</b>`, // HTML body
  });
}

module.exports = sendEmail;
