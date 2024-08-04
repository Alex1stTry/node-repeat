import mongoose, { Schema } from "mongoose";

import { IOldPass } from "../interfaces/old-pass.interface";
import { User } from "./user.model";

const oldPasswordSchema = new Schema(
  {
    password: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OldPass = mongoose.model<IOldPass>(
  "old-passwords",
  oldPasswordSchema,
);
