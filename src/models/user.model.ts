import mongoose from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, require: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: RoleEnum,
      default: RoleEnum.USER,
      required: true,
    },
    isVerified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = mongoose.model<IUser>("users", userSchema);
