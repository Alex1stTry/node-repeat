import { userOrderEnum } from "../enums/order.enum";
import { userOrderByEnum } from "../enums/user-orderBy.enum";

export interface IUser {
  _id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: string;
  isVerified: boolean;
}

export interface ILogin extends Pick<IUser, "email" | "password"> {}

export interface IPrivateUser
  extends Pick<IUser, "name" | "age" | "_id" | "phone" | "email" | "avatar"> {}

export interface IPublicUser
  extends Pick<IUser, "_id" | "age" | "name" | "avatar"> {}

export interface ISetNewPass {
  oldPassword: string;
  newPassword: string;
}

export interface IUserQueryList {
  page?: number;
  limit?: number;
  search?: string;
  order?: userOrderEnum;
  orderBy?: userOrderByEnum;
}

export interface IUserResponseList extends IUserQueryList {
  data: IPublicUser[];
  total: number;
}
