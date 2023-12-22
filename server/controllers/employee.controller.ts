import { RequestHandler } from "express";
import employeeModel from "../models/employee.model";

const addEmployee: RequestHandler = async (req, res) => {
  try {
    const employeeBody = req.body;

    const employee = new employeeModel(employeeBody);

    await employee.save();
    res.status(201).send({ employee });
  } catch (error) {
    res.status(400).send(error);
  }
};

export { addEmployee };
