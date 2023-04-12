import { app } from "./app.js";
import { config } from "dotenv";
import { connectDatabse } from "./config/database.js";

config({
  path: "./config/config.env",
});

connectDatabse();
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
