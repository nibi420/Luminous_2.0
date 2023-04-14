import express from "express";
import { addEvent, getUpcomingEvent } from "../controllers/Event.js";
import { getAllEvents } from "../controllers/Event.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
// isAuthenticated
router.route("/addEvent").post( isAuthenticated,addEvent);
router.route("/getAllEvents").get( isAuthenticated,getAllEvents);
router.route("/getUpcomingEvent").get(isAuthenticated, getUpcomingEvent);

export default router;