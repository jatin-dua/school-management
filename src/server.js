import app from "./app.js";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await initDB(); // make sure table exists
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
