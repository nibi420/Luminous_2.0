import cookieParser from "cookie-parser";
import express from "express";
import User from "./routers/User.js";
import Venue from "./routers/Venue.js";
import Events from "./routers/Event.js";
import Map from "./routers/Map.js";

import fileUpload from "express-fileupload";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(cors());


app.use("/", User);
app.use("/",Venue);
app.use("/",Events)
app.use("/",Map);
// app.use("/",Events);
