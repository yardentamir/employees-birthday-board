/* eslint-disable @typescript-eslint/no-explicit-any */
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
  try {
    const authorizationHeader = req.headers["authorization"];

    console.log("header ", authorizationHeader);

    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, SECRET_KEY) as { _id: string };
    const employee = await Employee.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!employee) {
      throw new Error("There is no such user");
    }

    req.token = token;
    req.employee = employee;
    next();
  } catch (e) {
    next(e);
  }
};

export default auth;
