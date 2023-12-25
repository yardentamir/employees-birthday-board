import bcrypt from "bcrypt";
import { cleanEnv, str } from "envalid";
import jwt from "jsonwebtoken";
import {
  Document,
  InferSchemaType,
  Model,
  Schema,
  Types,
  model,
} from "mongoose";
import validator from "validator";

export interface IEmployee extends Omit<Document, "toJSON"> {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  receivedWishes: Types.ObjectId[];
  tokens: { token: string }[];
  toJSON: () => Omit<this, "password" | "tokens">;
  generateAuthToken(): Promise<string>;
}

export interface EmployeeModel extends Model<IEmployee> {
  findByCredentials(email: string, password: string): Promise<IEmployee>;
}

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
      // validate(value: string) {
      //   if (validator.isStrongPassword(value)) {
      //     throw new Error("Not a strong password");
      //   }
      // },
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

  // userObject.birthDate = format(
  //   this.birthDate,
  //   "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  //   {
  //     timeZone: "Your/Timezone", // Replace with your desired timezone
  //   }
  // );

  return userObject;
};

const { SECRET_KEY } = cleanEnv(process.env, {
  SECRET_KEY: str(),
});

employeeSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, SECRET_KEY, {
    expiresIn: "2 days",
  });

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

employeeSchema.statics.findByCredentials = async (email, password) => {
  const employee = await Employee.findOne({ email });

  if (!employee) {
    throw new Error("There is no such user");
  }

  const isMatch = await bcrypt.compare(password, employee.password);

  if (!isMatch) {
    throw new Error("Password is incorrect");
  }

  return employee;
};

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  // Parse birthDate with the provided timezone
  // this.birthDate = parse(this.birthDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx', {
  //   timeZone: 'Your/Timezone', // Replace with the desired timezone
  // });

  next();
});

export type EmployeeType = InferSchemaType<typeof employeeSchema>;

const Employee = model<IEmployee, EmployeeModel>("Employee", employeeSchema);

export default Employee;
