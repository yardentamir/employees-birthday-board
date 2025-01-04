import { NextFunction, Request, Response } from "express";
import RESPONSE from "../constants/response.constant";
import { Schema } from "joi";

const validateReq =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const validationError = error.details
        .map((err) => err.message)
        .join(", ");
      req.log.warn(validationError);
      return res
        .status(RESPONSE.BAD_REQUEST.STATUS)
        .json({ error: error.details[0].message });
    }
    next();
  };

export default validateReq;
