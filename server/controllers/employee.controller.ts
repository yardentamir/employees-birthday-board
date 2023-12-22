import { RequestHandler } from "express";
import employeeModel from "../models/employee.model";

const signup: RequestHandler = async (req, res) => {
  try {
    const employeeBody = req.body;

    const employee = new employeeModel(employeeBody);
    const token = await employee.generateAuthToken();

    await employee.save();
    res.status(201).send({ employee, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await employeeModel.findByCredentials(email, password);
    const token = await employee.generateAuthToken();

    console.log(email, password, token, employee);

    res.send({ employee, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const loadEmployees: RequestHandler = async (req, res) => {
  try {
    const employees = await employeeModel.find();

    res.status(201).send(employees);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { loadEmployees, login, signup };
