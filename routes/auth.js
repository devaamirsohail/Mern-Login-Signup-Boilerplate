const express = require("express");
const router = express.Router();

//import controller
const {
  signup,
  accountActivation,
  signin,
  forgotPassword,
  resetPassword,
  googleLogin
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/account-activation", accountActivation);
router.post("/signin", signin);
//Reset Password
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
//Google Login
router.post("/google-login", googleLogin);

module.exports = router;
