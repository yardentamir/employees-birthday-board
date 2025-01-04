import RESPONSE from "../constants/response.constant";
import { IEmployeeDocument } from "../types/employee.type";
import { Request, Response } from "express";

export const clearTokens = async (
  employee: IEmployeeDocument,
  clearAll: boolean = false,
  tokenToExclude: null | string = null
) => {
  employee.tokens = clearAll
    ? []
    : employee.tokens.filter((token) => token.token !== tokenToExclude);
  await employee.save();
};

export const handleControllerError = (
  req: Request,
  res: Response,
  error: unknown,
  logMessage: string = "Controller error"
) => {
  if (error instanceof Error) {
    req.log.error({ error }, logMessage);
    res
      .status(RESPONSE.INTERNAL_SERVER_ERROR.STATUS)
      .json({ error: RESPONSE.INTERNAL_SERVER_ERROR.MESSAGE });
  } else {
    req.log.error(logMessage);
    res
      .status(RESPONSE.INTERNAL_SERVER_ERROR.STATUS)
      .json({ error: RESPONSE.INTERNAL_SERVER_ERROR.UNKNOWN_MESSAGE });
  }
};
