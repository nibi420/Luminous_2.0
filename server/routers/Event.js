import express from "express";
import { addEvent } from "../controllers/Event.js";
import { getAllEvents } from "../controllers/Event.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/addEvent").post(isAuthenticated, addEvent);
router.route("/getAllEvents").get(isAuthenticated, getAllEvents);

export default router;