import { Types, Model, Document } from "mongoose";

export interface IEmployee extends Omit<Document, "toJSON"> {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  receivedWishes: Types.ObjectId[];
  tokens: { token: string }[];
  toJSON: () => Omit<this, "password" | "tokens">;
  generateAuthToken(): Promise<string>;
}

export interface EmployeeModel extends Model<IEmployee> {
  findByCredentials(email: string, password: string): Promise<IEmployee>;
}

export type IEmployeeDocument = Document<unknown, {}, IEmployee> &
  IEmployee &
  Required<{
    _id: Types.ObjectId;
  }> & {
    __v: number;
  };
