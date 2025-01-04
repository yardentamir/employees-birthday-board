import cors from "cors";
import "dotenv/config";
import { cleanEnv, port } from "envalid";
import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { pinoHttp } from "pino-http";
import "./database/mongodb";
import logger from "./utils/logger.util";
import employeeRoutes from "./routes/employee.routes";

const { PORT } = cleanEnv(process.env, {
  PORT: port(),
});

const app = express();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());

app.use("/employee", employeeRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const errorMessage = `404 - Page Not Found: ${req.method} ${req.url}`;
  logger.error(errorMessage);
  next(createHttpError(404, "Page Not Found"));
});

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
