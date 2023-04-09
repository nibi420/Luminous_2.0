import express from "express";
import { register, verify, login, logout } from "../controllers/User.js";
import { isAuthenticated } from "../middleware/auth.js";
import { getDonCats, getDonationsData, pushDonCats, pushDonationsData } from "../controllers/Donations.js";
import { sendAgain } from "../controllers/User.js";

const router = express.Router();

// User Routes
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verify").post(isAuthenticated, verify);
router.route("/getDonationsData").get(getDonationsData);
router.route("/pushDonationsData").post(pushDonationsData);
router.route("/getDonationCategories").post(getDonCats);
router.route("/pushDonationCategories").post(pushDonCats);

router.route("/resend").get(isAuthenticated, sendAgain);

router.route("/logout").get(logout);

//Venue Routes
export default router;
