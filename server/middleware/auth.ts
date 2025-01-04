import { cleanEnv, str } from "envalid";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Employee from "../models/employee.model";
import CLIENT_RESPONSE from "../constants/response.constant";
import LOG_MESSAGES from "../constants/logs.constant";
import { IEmployeeDocument } from "../types/employee.type";
const { SECRET_KEY } = cleanEnv(process.env, {
  SECRET_KEY: str(),
});

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader: string | undefined = req.headers["authorization"];

  if (!authorizationHeader) {
    res
      .status(CLIENT_RESPONSE.UNAUTHORIZED.STATUS)
      .json({ error: CLIENT_RESPONSE.UNAUTHORIZED.REQUIRED_AUTHENTICATION });
    req.log.error(LOG_MESSAGES.AUTH.MISSING_AUTH_TOKEN);
    return;
  }

  const token: string = authorizationHeader.replace("Bearer ", "");

  const decoded: string | jwt.JwtPayload = jwt.verify(token, SECRET_KEY);
  const employee: null | IEmployeeDocument = await Employee.findOne({
    _id: decoded,
    "tokens.token": token,
  });

  if (!employee) {
    req.log.error(LOG_MESSAGES.AUTH.UNAUTHORIZED_ATTEMPT);
    res
      .status(CLIENT_RESPONSE.UNAUTHORIZED.STATUS)
      .json({ error: CLIENT_RESPONSE.UNAUTHORIZED.RETRY_LOGIN });
    return;
  }

  req.token = token;
  req.employee = employee;
  next();
};

export default auth;
