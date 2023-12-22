import { InferSchemaType, Schema, model } from "mongoose";
import validator from "validator";

// interface BirthdayWish {
//   sender: string;
//   message: string;
// }

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
      validate(value: string) {
        if (validator.isStrongPassword(value)) {
          throw new Error("Not a strong password");
        }
      },
    },
    birthDate: { type: Date, required: true },
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

export type EmployeeType = InferSchemaType<typeof employeeSchema>;

export default model<EmployeeType>("Employee", employeeSchema);
