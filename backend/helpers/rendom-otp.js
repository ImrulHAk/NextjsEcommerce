const otpGenerator = require("otp-generator");

function Rendom_otp() {
  const otp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  return otp;
}

module.exports = Rendom_otp;
