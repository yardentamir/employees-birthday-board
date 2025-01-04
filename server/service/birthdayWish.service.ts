import { Types } from "mongoose";
import logger from "../utils/logger.util";
import BirthdayWish from "../models/birthdayWish.model";
import Employee from "../models/employee.model";
import { IBirthdayWish } from "../types/wish.type";
import { IEmployeeDocument } from "../types/employee.type";
import LOG_MESSAGES from "../constants/logs.constant";

class BirthdayWishService {
  public static async logBirthdayWish(
    senderId: Types.ObjectId,
    recipientId: Types.ObjectId,
    message: string
  ): Promise<IBirthdayWish> {
    try {
      logger.info(
        { senderId, recipientId, message },
        LOG_MESSAGES.WISHS.LOGGING
      );

      const birthdayWishToSend = new BirthdayWish({
        recipientId,
        senderId,
        message,
      });

      const savedWish = await birthdayWishToSend.save();

      const sentBirthdayWish = await Employee.findByIdAndUpdate(
        recipientId,
        { $push: { receivedWishes: savedWish } },
        { new: true }
      );

      logger.info(
        { senderId, recipientId, message, savedWish, sentBirthdayWish },
        LOG_MESSAGES.WISHS.SUCCESSFUL_LOG
      );

      return savedWish;
    } catch (error) {
      logger.error(
        { senderId, recipientId, message, error },
        LOG_MESSAGES.WISHS.LOGGING_FAILED
      );
      throw error;
    }
  }

  public static async getEmployeesWithWishes(): Promise<{
    employees: IEmployeeDocument[];
    count: number;
  }> {
    try {
      logger.info(LOG_MESSAGES.EMPLOYEES.LOADING_WITH_ATLEAST_ONE_WISH);

      const employeesWithWishes = await Employee.find({
        receivedWishes: { $exists: true, $not: { $size: 0 } },
      });

      logger.info(
        { employeesWithWishes, count: employeesWithWishes.length },
        LOG_MESSAGES.EMPLOYEES.SUCCESSFUL_WITH_ATLEAST_ONE_WISH
      );

      return {
        employees: employeesWithWishes,
        count: employeesWithWishes.length,
      };
    } catch (error) {
      logger.error(
        { error },
        LOG_MESSAGES.EMPLOYEES.LOAD_WITH_ATLEAST_ONE_WISH_FAILED
      );
      throw error;
    }
  }
}

export default BirthdayWishService;
