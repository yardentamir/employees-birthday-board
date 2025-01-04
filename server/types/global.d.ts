import { IEmployee } from "./employee.type";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      token: string;
      employee: IEmployee;
    }
  }
}
