import cookieParser from "cookie-parser";
import express from "express";
import User from "./routers/User.js";
import Venue from "./routers/Venue.js";
import Events from "./routers/Event.js";
import Map from "./routers/Map.js";


export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/", User);
app.use("/",Venue);
app.use("/",Events)
app.use("/",Map);
// app.use("/",Events);
