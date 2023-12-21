import cors from "cors";
import "dotenv/config";
import { cleanEnv, port, str } from "envalid";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

const { MONGODB_URL, PORT } = cleanEnv(process.env, {
  MONGODB_URL: str(),
  PORT: port(),
});

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! MongoDB connection successful.");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
