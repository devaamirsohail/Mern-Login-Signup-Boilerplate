const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateResetPasswordInput(data) {
  let errors = {};

  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters long";
  }
  if (Validator.isEmpty(data.newPassword)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
