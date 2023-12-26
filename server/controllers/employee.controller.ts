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

    const employee = new employeeModel(employeeBody);
    const token = await employee.generateAuthToken();

    await employee.save();

    req.log.info("Employee signed up successfully");
    res.status(201).send({ employee, token });
  } catch (error) {
    if (error instanceof Error) {
      req.log.error({
        message: "Signup failed",
        body: req.body,
        error: error.message,
      });
      res.status(400).json({ error: error.message });
    }
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const errorMessage = "Email and Password are required";
      req.log.warn(errorMessage);
      throw new Error(errorMessage);
    }

    if (!validator.isEmail(email)) {
      const errorMessage = "Email is invalid";
      req.log.warn(errorMessage);
      throw new Error(errorMessage);
    }

    const employee = await employeeModel.findByCredentials(email, password);
    const token = await employee.generateAuthToken();

    req.log.info({
      message: "User login successful",
      userEmail: email,
      userId: employee._id,
    });

    res.send({ employee, token });
  } catch (error) {
    if (error instanceof Error) {
      req.log.error({
        message: "Login failed",
        userEmail: req.body.email,
        error: error.message,
      });
      res.status(400).json({ error: error.message });
    }
  }
};

export const loadEmployees: RequestHandler = async (req, res) => {
  try {
    const employees = await employeeModel.find();

    req.log.info("Successfully loaded all the employees");

    res.status(201).send(employees);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      req.log.error({
        message: "Login failed",
        error: error.message,
      });
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

      req.log.info(
        { employeeId: req.employee._id },
        "Employee logged out successfully"
      );
      res.status(200).send("log out successfully!");
    } else {
      req.log.warn("Unauthorized attempt to log out");
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    req.log.error({ error }, "Error during log out");
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
      req.log.info(
        { employeeId: req.employee._id },
        "Employee logged out from all devices successfully"
      );
      res.send();
    } else {
      req.log.warn("Unauthorized attempt to log out from all devices");
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    req.log.error({ error }, "Error during log out from all devices");
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
    if (error instanceof Error) {
      req.log.error({ error }, "Error loading employees with birthdays");
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
      res.status(400).json({ error: "Email and message are required" });
      req.log.warn("Email and message are required");
      return;
    }

    if (req.employee) {
      const employee = await Employee.findOne({ email });
      if (employee) {
        const senderId = req.employee._id;
        const recipientId = employee._id;
        if (senderId.equals(recipientId)) {
          res.status(400).json({
            error: "Don't be silly, you can't wish happy birthday to yourself",
          });
          req.log.warn("Can't wish happy birthday to logged in employee");
          return;
        }
        const loggedWish = await BirthdayWishService.logBirthdayWish(
          senderId,
          recipientId,
          message
        );
        res.status(200).json(loggedWish);
        req.log.info("Birthday wish logged successfully");
      } else {
        res.status(400).json({ error: "email and message are required" });
        return;
      }
    } else {
      req.log.warn("Unauthorized attempt to log out from all devices");
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      req.log.error({ error }, "Error logging birthday wish");
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
    req.log.info({ message: "Loaded employees with wishes successfully" });
  } catch (error) {
    if (error instanceof Error) {
      req.log.error({ error, message: "Error loading employees with wishes" });
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
