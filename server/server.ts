import cors from "cors";
import "dotenv/config";
import { cleanEnv, port } from "envalid";
import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import "./database/mongodb";
import Employee from "./models/employee.model";
import employeeRoutes from "./routes/employee.route";

const { PORT } = cleanEnv(process.env, {
  PORT: port(),
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/employee", employeeRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Page Not Found"));
});

app.get("/", async (req: Request, res: Response) => {
  const employees = await Employee.find().exec();
  res.status(200).json(employees);
  res.send("MongoDB connection successful.");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
