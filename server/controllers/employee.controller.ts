import { RequestHandler } from "express";
import validator from "validator";
import { AuthRequest } from "../middleware/auth";
import {
  default as Employee,
  default as employeeModel,
} from "../models/employee.model";
import BirthdayService from "../service/birthday.service";
import BirthdayWishService from "../service/birthdayWish.service";

export const signup: RequestHandler = async (req, res) => {
  try {
    const employeeBody = req.body;

    const dateStr = new Date(req.body.birthDate).toUTCString();
    const date = new Date(dateStr);
    req.body.birthDate = date;

    const employee = new employeeModel(employeeBody);
    const token = await employee.generateAuthToken();

    await employee.save();
    res.status(201).send({ employee, token });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("Email and Password are required");
    if (!validator.isEmail(email)) throw new Error("Email is invalid");
    const employee = await employeeModel.findByCredentials(email, password);
    const token = await employee.generateAuthToken();

    res.send({ employee, token });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const loadEmployees: RequestHandler = async (req, res) => {
  try {
    const employees = await employeeModel.find();

    res.status(201).send(employees);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const logOut: RequestHandler = async function (req: AuthRequest, res) {
  try {
    if (req.employee) {
      req.employee.tokens = req.employee.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.employee.save();

      res.status(200).send("log out successfully!");
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const logOutAll: RequestHandler = async (req: AuthRequest, res) => {
  try {
    if (req.employee) {
      req.employee.tokens = [];
      await req.employee.save();
      res.send();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const loadEmployeesWithBirthdays: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    const employeesWithBirthdays =
      await BirthdayService.getEmployeesWithBirthdaysToday();
    res.status(200).json(employeesWithBirthdays);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const logBirthdayWish: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      res.status(400).json({ error: "email and message are required" });
      return;
    }

    if (req.employee) {
      const employee = await Employee.findOne({ email });
      if (employee) {
        const senderId = req.employee._id;
        const recipientId = employee._id;
        const loggedWish = await BirthdayWishService.logBirthdayWish(
          senderId,
          recipientId,
          message
        );
        res.status(200).json(loggedWish);
      } else {
        res.status(400).json({ error: "email and message are required" });
        return;
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const loadEmployeesWithWishes: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    const { employees, count } =
      await BirthdayWishService.getEmployeesWithWishes();

    res.status(200).json({ count, employees });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
