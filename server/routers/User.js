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
import { getDonCats, getDonationLatest, getDonationsData, pushDonCats, pushDonationsData } from "../controllers/Donations.js";

const router = express.Router();

// User Routes
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verify").post(isAuthenticated, verify);
router.route("/getDonationsData").get(getDonationsData);
router.route("/getDonationLatest").get(getDonationLatest);
router.route("/pushDonationsData").post(pushDonationsData);
router.route("/getDonationCategories").post(getDonCats);
router.route("/pushDonationCategories").post(pushDonCats);

router.route("/resend").get(isAuthenticated, sendAgain);
router.route("/changePassword").post(isAuthenticated, changePassword);
router.route("/getProfile").get(isAuthenticated, getProfile);
router.route("/upload").put(isAuthenticated, uploadPicture);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(isAuthenticated, resetPassword);
router.route("/settingPassword").put(isAuthenticated, settingPassword);

router.route("/logout").get(logout);

//Venue Routes
export default router;
