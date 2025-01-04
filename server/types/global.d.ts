import { IEmployeeDocument } from "./employee.type";
import { Request } from "express";
declare global {
  namespace Express {
    export interface Request {
      token: string;
      employee: IEmployeeDocument;
    }
  }
}

// to make the file a module and avoid the TypeScript error
export {};
