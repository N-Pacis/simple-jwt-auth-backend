import app from "./src/app.js"
import { config } from "dotenv";
config({
  path: "./.env",
});
import { connectDB } from "./src/utils/database.js";


app.listen(process.env.PORT, async () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
  await connectDB();
});
