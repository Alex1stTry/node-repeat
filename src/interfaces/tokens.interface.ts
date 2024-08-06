import { ActionTokenTypeEnum } from "../enums/action.token-type.enum";
import { IUser } from "./user.intefrace";

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
export interface ITokensPair extends ITokens {
  _id?: string;
  _userId: string | IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ITokenPayload {
  userId: string;
  role: string;
}

export interface IActionToken {
  _id?: string;
  actionToken: string | IUser;
  type: ActionTokenTypeEnum;
  _userId: string;
}
