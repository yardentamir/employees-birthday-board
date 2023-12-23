import bcrypt from "bcrypt";
import { cleanEnv, str } from "envalid";
import jwt from "jsonwebtoken";
import { InferSchemaType, Model, Schema, model } from "mongoose";
import validator from "validator";

// interface BirthdayWish {
//   sender: string;
//   message: string;
// }

export interface IEmployee extends Document {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  tokens: { token: string }[];
  toJSON: () => void;
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    // birthdayWishes: [email
    //   {
    //     type: [
    //       new Schema<BirthdayWish>({
    //         sender: {
    //           type: String,
    //           validate(value: string) {
    //             if (!validator.isMongoId(value)) {
    //               throw new Error("Not a mongo identifier");
    //             }
    //           },
    //         },
    //         message: String,
    //       }),
    //     ],
    //     default: [],
    //   },
    // ],
  },
  { timestamps: true }
);

employeeSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};

const { SECRET_KEY } = cleanEnv(process.env, {
  SECRET_KEY: str(),
});

employeeSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, SECRET_KEY);
  console.log("generateAuthToken");

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

employeeSchema.statics.findByCredentials = async (email, password) => {
  const employee = await Employee.findOne({ email });

  if (!employee) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, employee.password);

  console.log("findByCredentials", isMatch, email, employee.password);

  if (!isMatch) {
    throw new Error("Unable to login");
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
