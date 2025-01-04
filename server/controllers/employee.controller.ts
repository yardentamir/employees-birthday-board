import { RequestHandler } from "express";
import validator from "validator";
import {
  default as Employee,
  default as employeeModel,
} from "../models/employee.model";
import BirthdayService from "../service/birthday.service";
import BirthdayWishService from "../service/birthdayWish.service";
import mongoose from "mongoose";
import LOG_MESSAGES from "../constants/logs.constant";
import RESPONSE from "../constants/response.constant";

export const signup: RequestHandler = async (req, res) => {
  try {
    const employeeBody = req.body;

    const employee = new employeeModel(employeeBody);
    const token = await employee.generateAuthToken();

    await employee.save();

    req.log.info(LOG_MESSAGES.AUTH.SUCCSESSFUL_SIGNUP);
    res.status(RESPONSE.RECORED_CREATED.STATUS).send({ employee, token });
  } catch (error) {
    if (error instanceof Error) {
      req.log.error({
        message: LOG_MESSAGES.AUTH.SIGNUP_FAILED,
        body: req.body,
        error: error.message,
      });
      res
        .status(RESPONSE.INTERNAL_SERVER_ERROR.STATUS)
        .json({ error: error.message });
    }
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const errorMessage = RESPONSE.BAD_REQUEST.REQUIRED_LOGIN;
      req.log.warn(errorMessage);
      throw new Error(errorMessage);
    }

    if (!validator.isEmail(email)) {
      const errorMessage = RESPONSE.BAD_REQUEST.INVALID_EMAIL;
      req.log.warn(errorMessage);
      throw new Error(errorMessage);
    }

    const employee = await employeeModel.findByCredentials(email, password);
    const token = await employee.generateAuthToken();

    req.log.info({
      message: LOG_MESSAGES.AUTH.SUCCSESSFUL_LOGIN,
      userEmail: email,
      userId: employee._id,
    });

    res.send({ employee, token });
  } catch (error) {
    if (error instanceof Error) {
      req.log.error({
        message: LOG_MESSAGES.AUTH.LOGIN_FAILED,
        userEmail: req.body.email,
        error: error.message,
      });
      res.status(RESPONSE.BAD_REQUEST.STATUS).json({ error: error.message });
    }
  }
};

export const loadEmployees: RequestHandler = async (req, res) => {
  try {
    const employees = await employeeModel.find();

    req.log.info(LOG_MESSAGES.EMPLOYEES.LOAD_SUCCESS);

    res.status(RESPONSE.RECORED_CREATED.STATUS).send(employees);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      req.log.error({
        message: LOG_MESSAGES.AUTH.LOGIN_FAILED,
        error: error.message,
      });
      res.status(400).json({ error: error.message });
    }
  }
};

export const logOut: RequestHandler = async function (req, res) {
  try {
    req.employee.tokens = req.employee.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.employee.save();

    req.log.info(
      { employeeId: req.employee._id },
      LOG_MESSAGES.AUTH.SUCCSESSFUL_LOGOUT
    );
    res.status(RESPONSE.SUCCESS.STATUS).send(RESPONSE.SUCCESS.LOGIN);
  } catch (error) {
    req.log.error({ error }, LOG_MESSAGES.AUTH.LOGOUT_FAILED);
    if (error instanceof Error) {
      res
        .status(RESPONSE.INTERNAL_SERVER_ERROR.STATUS)
        .json({ error: RESPONSE.INTERNAL_SERVER_ERROR.MESSAGE });
    }
  }
};

export const logOutAll: RequestHandler = async (req, res) => {
  try {
    req.employee.tokens = [];
    await req.employee.save();
    req.log.info(
      { employeeId: req.employee._id },
      LOG_MESSAGES.AUTH.LOGOUT_ALL_DEVICES
    );
    res.send();
  } catch (error) {
    req.log.error({ error }, LOG_MESSAGES.AUTH.LOGOUT_ALL_DEVICES_FAILED);
    if (error instanceof Error) {
      res
        .status(RESPONSE.INTERNAL_SERVER_ERROR.STATUS)
        .json({ error: RESPONSE.INTERNAL_SERVER_ERROR.MESSAGE });
    }
  }
};

export const loadEmployeesWithBirthdays: RequestHandler = async (req, res) => {
  try {
    const employeesWithBirthdays =
      await BirthdayService.getEmployeesWithBirthdaysToday();
    res.status(200).json(employeesWithBirthdays);
  } catch (error) {
    req.log.error({ error }, LOG_MESSAGES.EMPLOYEES.LOAD_BIRTHDAYS_FAILED);
    if (error instanceof Error) {
      res
        .status(RESPONSE.INTERNAL_SERVER_ERROR.STATUS)
        .json({ error: RESPONSE.INTERNAL_SERVER_ERROR.MESSAGE });
    }
  }
};

export const logBirthdayWish: RequestHandler = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      res
        .status(RESPONSE.BAD_REQUEST.STATUS)
        .json({ error: RESPONSE.BAD_REQUEST.REQUIRED_LOGIN });
      req.log.warn(RESPONSE.BAD_REQUEST.REQUIRED_LOGIN);
      return;
    }

    const employee = await Employee.findOne({ email });
    if (employee) {
      const senderId = req.employee._id as mongoose.Types.ObjectId;
      const recipientId = employee._id as mongoose.Types.ObjectId;
      if (senderId.equals(recipientId)) {
        res.status(RESPONSE.BAD_REQUEST.STATUS).json({
          error: RESPONSE.BAD_REQUEST.SELF_WISH,
        });
        req.log.warn(LOG_MESSAGES.WISHS.SELF_WISH);
        return;
      }
      const loggedWish = await BirthdayWishService.logBirthdayWish(
        senderId,
        recipientId,
        message
      );
      res.status(RESPONSE.SUCCESS.STATUS).json(loggedWish);
      req.log.info(LOG_MESSAGES.WISHS.SUCCESSFUL_WISH);
    } else {
      res
        .status(RESPONSE.BAD_REQUEST.STATUS)
        .json({ error: RESPONSE.BAD_REQUEST.REQUIRED_LOGIN });
      return;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      req.log.error({ error }, LOG_MESSAGES.WISHS.WISH_LOG_FAILED);
      res
        .status(RESPONSE.INTERNAL_SERVER_ERROR.STATUS)
        .json({ error: RESPONSE.INTERNAL_SERVER_ERROR.MESSAGE });
    }
  }
};

export const loadEmployeesWithWishes: RequestHandler = async (req, res) => {
  try {
    const { employees, count } =
      await BirthdayWishService.getEmployeesWithWishes();

    res.status(RESPONSE.SUCCESS.STATUS).json({ count, employees });
    req.log.info({
      message: LOG_MESSAGES.EMPLOYEES.LOAD_EMPLOYEES_WITH_WISHES,
    });
  } catch (error) {
    if (error instanceof Error) {
      req.log.error({
        error,
        message: LOG_MESSAGES.EMPLOYEES.LOAD_WISHES_FAILED,
      });
      res
        .status(RESPONSE.INTERNAL_SERVER_ERROR.STATUS)
        .json({ error: RESPONSE.INTERNAL_SERVER_ERROR.MESSAGE });
    }
  }
};

export const me: RequestHandler = (req, res) => {
  res.status(RESPONSE.SUCCESS.STATUS).send(req.employee);
};
