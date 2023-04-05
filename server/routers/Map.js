import express from "express";
import { addlocation } from "../controllers/Map.js";

const router = express.Router();


router.route("/addlocation").post(addlocation);


export default router;