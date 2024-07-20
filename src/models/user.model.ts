import mongoose from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.inteface";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    isVerified: { type: Boolean, required: true, default: false },
    role: {
      type: String,
      enum: RoleEnum,
      required: true,
      default: RoleEnum.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = mongoose.model<IUser>("users", userSchema);
