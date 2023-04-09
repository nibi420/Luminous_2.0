import express from "express";
import { addEvent } from "../controllers/Event.js";
import { getAllEvents } from "../controllers/Event.js";

const router = express.Router();

router.route("/addEvent").post(addEvent);
router.route("/getAllEvents").get(getAllEvents);

export default router;