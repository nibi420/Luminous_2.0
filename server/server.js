import { app } from "./app.js";
import { config } from "dotenv";
import { connectDatabse } from "./config/database.js";
import cloudindary from "cloudinary";

config({
  path: "./config/config.env",
});

cloudindary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

connectDatabse();
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
