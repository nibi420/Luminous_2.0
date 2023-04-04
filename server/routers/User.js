import express from "express";
import { register, verify, login, logout } from "../controllers/User.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

// User Routes
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verify").post(isAuthenticated, verify);
router.route("/logout").get(logout);

//Venue Routes
export default router;
