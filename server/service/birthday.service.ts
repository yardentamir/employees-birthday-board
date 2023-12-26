import logger from "../middleware/logger";
import Employee, { IEmployee } from "../models/employee.model";

class BirthdayService {
  public static async getEmployeesWithBirthdaysToday(): Promise<IEmployee[]> {
    try {
      logger.info("Fetching employees with birthdays today");
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      const employeesWithBirthdays = await Employee.find({
        $expr: {
          $and: [
            { $eq: [{ $month: "$birthDate" }, currentMonth] },
            { $eq: [{ $dayOfMonth: "$birthDate" }, currentDay] },
          ],
        },
      });

      logger.info(
        { count: employeesWithBirthdays.length },
        "Retrieved employees with birthdays today"
      );

      return employeesWithBirthdays;
    } catch (error) {
      logger.error({ error }, "Error retrieving employees with birthdays");
      throw error;
    }
  }
}

export default BirthdayService;
