import { Types } from "mongoose";
import BirthdayWish, { IBirthdayWish } from "../models/birthdayWish.model";
import Employee, { IEmployee } from "../models/employee.model";

class BirthdayWishService {
  static async logBirthdayWish(
    senderId: Types.ObjectId,
    recipientId: Types.ObjectId,
    message: string
  ): Promise<IBirthdayWish> {
    try {
      const birthdayWish = new BirthdayWish({
        recipientId,
        senderId,
        message,
      });

      const savedWish = await birthdayWish.save();

      await Employee.findByIdAndUpdate(
        recipientId,
        { $push: { receivedWishes: savedWish } },
        { new: true }
      );

      return savedWish;
    } catch (error) {
      console.error("Error logging birthday wish:", error);
      throw error;
    }
  }

  static async getEmployeesWithWishes(): Promise<{
    employees: IEmployee[];
    count: number;
  }> {
    try {
      const employeesWithWishes = await Employee.find({
        receivedWishes: { $exists: true, $not: { $size: 0 } },
      });

      return {
        employees: employeesWithWishes,
        count: employeesWithWishes.length,
      };
    } catch (error) {
      console.error("Error getting employees with at least one wish:", error);
      throw error;
    }
  }
}

export default BirthdayWishService;
