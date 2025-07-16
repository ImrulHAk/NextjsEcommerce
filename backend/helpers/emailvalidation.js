function emailValidation(email) {
  const emailverify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  return emailverify;
}

module.exports = emailValidation;
