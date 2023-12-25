import { cleanEnv, str } from "envalid";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Employee, { IEmployee } from "../models/employee.model";
const { SECRET_KEY } = cleanEnv(process.env, {
  SECRET_KEY: str(),
});

export interface AuthRequest extends Request {
  token?: string;
  employee?: IEmployee;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    res
      .status(401)
      .json({ error: "You're not connected, please authenticate" });
    return;
  }

  const token = authorizationHeader.replace("Bearer ", "");

  const decoded = jwt.verify(token, SECRET_KEY) as { _id: string };
  const employee = await Employee.findOne({
    _id: decoded._id,
    "tokens.token": token,
  });

  if (!employee) {
    res
      .status(401)
      .json({ error: "Something went wrong, please logout and log in again" });
    return;
  }

  req.token = token;
  req.employee = employee;
  next();
};

export default auth;
