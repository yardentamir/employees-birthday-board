import { Types } from "mongoose";
import logger from "../middleware/logger";
import BirthdayWish, { IBirthdayWish } from "../models/birthdayWish.model";
import Employee, { IEmployee } from "../models/employee.model";

class BirthdayWishService {
  public static async logBirthdayWish(
    senderId: Types.ObjectId,
    recipientId: Types.ObjectId,
    message: string
  ): Promise<IBirthdayWish> {
    try {
      logger.info({ senderId, recipientId, message }, "Logging birthday wish");

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
        "Birthday wish logged successfully"
      );

      return savedWish;
    } catch (error) {
      logger.error(
        { senderId, recipientId, message, error },
        "Error logging birthday wish"
      );
      throw error;
    }
  }

  public static async getEmployeesWithWishes(): Promise<{
    employees: IEmployee[];
    count: number;
  }> {
    try {
      logger.info("Loading employees with at least one wish");

      const employeesWithWishes = await Employee.find({
        receivedWishes: { $exists: true, $not: { $size: 0 } },
      });

      logger.info(
        { count: employeesWithWishes.length },
        "Retrieved employees with at least one wish"
      );

      logger.info(
        employeesWithWishes,
        "array of employees with at least one wish"
      );

      return {
        employees: employeesWithWishes,
        count: employeesWithWishes.length,
      };
    } catch (error) {
      logger.error({ error }, "Error getting employees with at least one wish");
      throw error;
    }
  }
}

export default BirthdayWishService;
