import { cleanEnv, str } from "envalid";
import { connect, connection as db } from "mongoose";
import logger from "../middleware/logger";

const { MONGODB_URL } = cleanEnv(process.env, {
  MONGODB_URL: str(),
});

connect(MONGODB_URL);

db.on("error", logger.error.bind(logger, "MongoDB connection error:"));
db.once("open", () => {
  logger.info("MongoDB connection successful.");
});
