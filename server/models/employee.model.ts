import bcrypt from "bcrypt";
import { format } from "date-fns-tz";
import { cleanEnv, str } from "envalid";
import jwt from "jsonwebtoken";
import { InferSchemaType, Schema, model } from "mongoose";
import validator from "validator";
import logger from "../utils/logger.util";
import LOG_MESSAGES from "../constants/logs.constant";
import { DATE_FORMAT } from "../constants/format.constant";
import { EmployeeModel, IEmployee } from "../types/employee.type";

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      trim: true,
    },
    birthDate: { type: Date, required: true },
    receivedWishes: [
      {
        type: Schema.Types.ObjectId,
        ref: "BirthdayWish",
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

employeeSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;

  const timeZone: string = new Intl.DateTimeFormat().resolvedOptions().timeZone;

  const birthDateWithTimeZone: string = format(this.birthDate, DATE_FORMAT, {
    timeZone,
  });

  userObject.birthDate = birthDateWithTimeZone;

  logger.info(
    {
      birthDateWithTimeZone,
      birthDateUTC: this.birthDate,
    },
    LOG_MESSAGES.EMPLOYEES.CONVERTED_BIRTH_DATE
  );

  return userObject;
};

const { SECRET_KEY } = cleanEnv(process.env, {
  SECRET_KEY: str(),
});

employeeSchema.methods.generateAuthToken = async function () {
  const token: string = jwt.sign({ _id: this._id.toString() }, SECRET_KEY, {
    expiresIn: "2 days",
  });

  this.tokens = this.tokens.concat({ token });
  logger.info({ userId: this._id }, "Generated Auth Token for user");
  await this.save();

  return token;
};

employeeSchema.statics.findByCredentials = async (email, password) => {
  const employee = await Employee.findOne({ email });

  if (!employee) {
    logger.error({ userEmail: email }, "User not found for email");
    throw new Error("There is no such user");
  }

  const isMatch: boolean = await bcrypt.compare(password, employee.password);

  if (!isMatch) {
    logger.error({ userEmail: email }, "Incorrect password for user");
    throw new Error("Password is incorrect");
  }

  return employee;
};

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

export type EmployeeType = InferSchemaType<typeof employeeSchema>;

const Employee = model<IEmployee, EmployeeModel>("Employee", employeeSchema);

export default Employee;
