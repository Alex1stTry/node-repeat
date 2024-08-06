import mongoose, { Schema } from "mongoose";

import { ActionTokenTypeEnum } from "../enums/action.token-type.enum";
import { IActionToken } from "../interfaces/tokens.interface";
import { User } from "./user.model";

const actionTokenSchema = new Schema(
  {
    actionToken: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    type: { type: String, required: true, enum: ActionTokenTypeEnum },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const ActionToken = mongoose.model<IActionToken>(
  "actionTokens",
  actionTokenSchema,
);
