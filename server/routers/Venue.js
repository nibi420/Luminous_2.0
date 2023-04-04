import express from "express";
import { addVenue } from "../controllers/Venues.js";

const router = express.Router();

router.route("/addVenue").post(addVenue);
export default router;