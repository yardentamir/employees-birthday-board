import Employee, { IEmployee } from "../models/employee.model";

class BirthdayService {
  static async getEmployeesWithBirthdaysToday(): Promise<IEmployee[]> {
    try {
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

      return employeesWithBirthdays;
    } catch (error) {
      console.error("Error retrieving employees with birthdays:", error);
      throw error;
    }
  }
}

export default BirthdayService;
