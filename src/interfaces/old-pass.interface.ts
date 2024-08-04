import { IUser } from "./user.intefrace";

export interface IOldPass {
  _id?: string;
  password: string;
  _userId: string | IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
