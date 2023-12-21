import { InferSchemaType, Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Invalid email address",
      },
    },
    birthDate: { type: Date, required: true },
    // birthdayWishes: [{ type: Schema<BirthdayWish>, default: [] }],
  },
  { timestamps: true }
);

type Employee = InferSchemaType<typeof employeeSchema>;

export default model<Employee>("Employee", employeeSchema);
