import { IUser } from "./user.intefrace";

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
export interface ITokensPair extends ITokens {
  _id?: string;
  _userId: string | IUser;
}
export interface ITokenPayload {
  userId: string;
  role: string;
}
