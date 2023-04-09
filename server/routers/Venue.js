import express from "express";
import { addVenue } from "../controllers/Venue.js";
import { getVenues } from "../controllers/Venue.js";


const router = express.Router();

router.route("/addVenue").post(addVenue);
router.route("/getVenues").get(getVenues);
export default router;