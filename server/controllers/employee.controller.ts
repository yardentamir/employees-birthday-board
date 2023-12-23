import { RequestHandler } from "express";
import { AuthRequest } from "../middleware/auth";
import employeeModel from "../models/employee.model";
import BirthdayService from "../service/birthday.service";
import BirthdayWishService from "../service/birthdayWish.service";

export const signup: RequestHandler = async (req, res) => {
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

export const login: RequestHandler = async (req, res) => {
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

export const loadEmployees: RequestHandler = async (req, res) => {
  try {
    const employees = await employeeModel.find();

    res.status(201).send(employees);
  } catch (error) {
    res.status(400).send(error);
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
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const logOutAll: RequestHandler = async (req: AuthRequest, res) => {
  try {
    if (req.employee) {
      req.employee.tokens = [];
      await req.employee.save();
      res.send();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.status(500).send(error);
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logBirthdayWish: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    const { recipientId, message } = req.body;

    if (!recipientId || !message) {
      res.status(400).json({
        error: "senderId, recipientId, and message are required fields",
      });
      return;
    }

    if (req.employee) {
      const senderId = req.employee._id;

      const loggedWish = await BirthdayWishService.logBirthdayWish(
        senderId,
        recipientId,
        message
      );

      res.status(200).json(loggedWish);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
    console.error("Error getting employees with at least one wish:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
