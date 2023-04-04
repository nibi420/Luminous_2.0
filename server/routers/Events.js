import express from "express";
import { addEvent } from "../controllers/Events.js";

const router = express.Router();

router.route("/addEvent").post(addEvent);

export default router;