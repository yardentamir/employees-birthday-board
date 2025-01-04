import logger from "../utils/logger.util";
import Employee from "../models/employee.model";
import { IEmployee, IEmployeeDocument } from "../types/employee.type";
import LOG_MESSAGES from "../constants/logs.constant";

class BirthdayService {
  public static async getEmployeesWithBirthdaysToday(): Promise<IEmployee[]> {
    try {
      logger.info(LOG_MESSAGES.EMPLOYEES.FETCH_WITH_BIRTHDAYS);
      const currentDate: Date = new Date();
      const currentMonth: number = currentDate.getMonth() + 1;
      const currentDay: number = currentDate.getDate();

      const employeesWithBirthdays: IEmployeeDocument[] = await Employee.find({
        $expr: {
          $and: [
            { $eq: [{ $month: "$birthDate" }, currentMonth] },
            { $eq: [{ $dayOfMonth: "$birthDate" }, currentDay] },
          ],
        },
      });

      logger.info(
        { count: employeesWithBirthdays.length },
        LOG_MESSAGES.EMPLOYEES.BIRTHDAY_TODAY
      );

      return employeesWithBirthdays;
    } catch (error) {
      logger.error(
        { error },
        LOG_MESSAGES.EMPLOYEES.FETCH_WITH_BIRTHDAYS_FAILED
      );
      throw error;
    }
  }
}

export default BirthdayService;
