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
  extends Pick<
    IUser,
    "name" | "age" | "_id" | "phone" | "email" | "createdAt" | "avatar"
  > {}
export interface IPublicUser extends Pick<IUser, "_id" | "age" | "name"> {}

export interface ISetNewPass {
  oldPassword: string;
  newPassword: string;
}
