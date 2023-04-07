import express from "express";
import { register, verify, login, logout } from "../controllers/User.js";
import { isAuthenticated } from "../middleware/auth.js";
import { sendAgain } from "../controllers/User.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verify").post(isAuthenticated, verify);
router.route("/resend").get(isAuthenticated, sendAgain);

router.route("/logout").get(logout);

export default router;