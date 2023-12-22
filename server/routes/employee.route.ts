import express from "express";
import { addEmployee } from "../controllers/employee.controller";

const rootRouter = express.Router();

rootRouter.post("/addEmployee", addEmployee);

export default rootRouter;
