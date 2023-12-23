import { Document, Schema, Types, model } from "mongoose";

export interface IBirthdayWish extends Document {
  senderId: Types.ObjectId;
  recipientId: Types.ObjectId;
  message: string;
  toJSON: () => this;
}

const birthdayWishSchema = new Schema<IBirthdayWish>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    message: { type: String, required: true },
  },
  {
    collection: "birthdayWishes",
    timestamps: { createdAt: true, updatedAt: false },
  }
);

birthdayWishSchema.methods.toJSON = function () {
  const birthdayWishObject = this.toObject();

  delete birthdayWishObject.__v;

  return birthdayWishObject;
};

const BirthdayWish = model<IBirthdayWish>("BirthdayWish", birthdayWishSchema);

export default BirthdayWish;
