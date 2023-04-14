import express from "express";
import { addlocation } from "../controllers/Map.js";
import { todaysEvents } from "../controllers/Map.js";
import { nextThreeDays } from "../controllers/Map.js";
import { nextSevenDays } from "../controllers/Map.js";
import { allDays } from "../controllers/Map.js";
const router = express.Router();


router.route("/addlocation").post(addlocation);
router.route("/todaysEvents").get(todaysEvents);
router.route("/nextThreedays").get(nextThreeDays);
router.route("/nextSevendays").get(nextSevenDays);
router.route("/allDays").get(allDays);

export default router;