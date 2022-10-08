const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
  getUserInfo,
  resetUserData,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/user/:userId").get(getUserInfo);
router.route("/user/reset").post(resetUserData);
router.route("/reset-password/:resetToken").put(resetPassword);
router.route("/refresh").post(refreshToken);

module.exports = router;
