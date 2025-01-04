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
import { clearTokens, handleControllerError } from "../utils/functions.util";
import { IEmployeeDocument } from "../types/employee.type";
import createHttpError from "http-errors";

export const signup: RequestHandler = async (req, res) => {
  try {
    const employeeBody = req.body;

    const employee: IEmployeeDocument = new employeeModel(employeeBody);
    const token: string = await employee.generateAuthToken();

    await employee.save();

    req.log.info(LOG_MESSAGES.AUTH.SUCCSESSFUL_SIGNUP);
    res.status(RESPONSE.RECORED_CREATED.STATUS).send({ employee, token });
  } catch (error) {
    handleControllerError(req, res, error, LOG_MESSAGES.AUTH.SIGNUP_FAILED);
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      const errorMessage: string = RESPONSE.BAD_REQUEST.INVALID_EMAIL;
      req.log.warn(errorMessage);
      createHttpError(RESPONSE.BAD_REQUEST.STATUS, errorMessage);
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
    handleControllerError(req, res, error, LOG_MESSAGES.AUTH.LOGIN_FAILED);
  }
};

export const loadEmployees: RequestHandler = async (req, res) => {
  try {
    const employees = await employeeModel.find();

    req.log.info(LOG_MESSAGES.EMPLOYEES.LOAD_SUCCESS);

    res.status(RESPONSE.RECORED_CREATED.STATUS).send(employees);
  } catch (error) {
    handleControllerError(req, res, error, LOG_MESSAGES.AUTH.LOGIN_FAILED);
  }
};

export const logOut: RequestHandler = async function (req, res) {
  try {
    await clearTokens(req.employee, false, req.token);

    req.log.info(
      { employeeId: req.employee._id },
      LOG_MESSAGES.AUTH.SUCCSESSFUL_LOGOUT
    );
    res.status(RESPONSE.SUCCESS.STATUS).send(RESPONSE.SUCCESS.LOGOUT);
  } catch (error) {
    handleControllerError(req, res, error, LOG_MESSAGES.AUTH.LOGOUT_FAILED);
  }
};

export const logOutAll: RequestHandler = async (req, res) => {
  try {
    await clearTokens(req.employee, true);

    req.log.info(
      { employeeId: req.employee._id },
      LOG_MESSAGES.AUTH.LOGOUT_ALL_DEVICES
    );
    res.status(RESPONSE.SUCCESS.STATUS).send(RESPONSE.SUCCESS.LOGOUT_ALL);
  } catch (error) {
    handleControllerError(
      req,
      res,
      error,
      LOG_MESSAGES.AUTH.LOGOUT_ALL_DEVICES_FAILED
    );
  }
};

export const loadEmployeesWithBirthdays: RequestHandler = async (req, res) => {
  try {
    const employeesWithBirthdays =
      await BirthdayService.getEmployeesWithBirthdaysToday();
    res.status(RESPONSE.SUCCESS.STATUS).json(employeesWithBirthdays);
  } catch (error) {
    handleControllerError(
      req,
      res,
      error,
      LOG_MESSAGES.EMPLOYEES.LOAD_BIRTHDAYS_FAILED
    );
  }
};

export const logBirthdayWish: RequestHandler = async (req, res) => {
  try {
    const { email, message } = req.body;

    const employee: null | IEmployeeDocument = await Employee.findOne({
      email,
    });

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
    handleControllerError(req, res, error, LOG_MESSAGES.WISHS.WISH_LOG_FAILED);
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
    handleControllerError(
      req,
      res,
      error,
      LOG_MESSAGES.EMPLOYEES.LOAD_WISHES_FAILED
    );
  }
};

export const me: RequestHandler = (req, res) => {
  res.status(RESPONSE.SUCCESS.STATUS).send(req.employee);
};
