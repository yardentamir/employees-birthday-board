import { Types } from "mongoose";

export interface IBirthdayWish extends Document {
  senderId: Types.ObjectId;
  recipientId: Types.ObjectId;
  message: string;
  toJSON: () => this;
}
