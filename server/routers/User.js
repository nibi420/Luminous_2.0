import express from "express";
import {
  register,
  verify,
  login,
  logout,
  sendAgain,
  changePassword,
  getProfile,
  uploadPicture,
  forgotPassword,
  resetPassword,
  settingPassword,
} from "../controllers/User.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verify").post(isAuthenticated, verify);
router.route("/resend").get(isAuthenticated, sendAgain);
router.route("/changePassword").post(isAuthenticated, changePassword);
router.route("/getProfile").get(isAuthenticated, getProfile);
router.route("/upload").put(isAuthenticated, uploadPicture);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(isAuthenticated, resetPassword);
router.route("/settingPassword").put(isAuthenticated, settingPassword);

router.route("/logout").get(logout);

export default router;
