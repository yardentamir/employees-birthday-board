import cors from "cors";
import "dotenv/config";
import { cleanEnv, port } from "envalid";
import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { pinoHttp } from "pino-http";
import "./database/mongodb";
import logger from "./utils/logger.util";
import employeeRoutes from "./routes/employee.routes";
import RESPONSE from "./constants/response.constant";

const { PORT } = cleanEnv(process.env, {
  PORT: port(),
});

const app = express();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());

app.use("/employee", employeeRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.warn({ method: req.method, url: req.url }, RESPONSE.NOT_FOUND.MESSAGE);
  next(createHttpError(RESPONSE.NOT_FOUND.STATUS, RESPONSE.NOT_FOUND.MESSAGE));
});

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
