import mongoose, { Schema } from "mongoose";

import { ITokensPair } from "../interfaces/token.interface";
import { User } from "./user.model";

const tokenSchema = new Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    _userId: { type: String, required: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = mongoose.model<ITokensPair>("tokens", tokenSchema);
