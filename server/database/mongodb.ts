import { cleanEnv, str } from "envalid";
import { connect, connection as db } from "mongoose";

const { MONGODB_URL } = cleanEnv(process.env, {
  MONGODB_URL: str(),
});

connect(MONGODB_URL);

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
