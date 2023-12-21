import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URL || "");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! MongoDB connection successful.");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
