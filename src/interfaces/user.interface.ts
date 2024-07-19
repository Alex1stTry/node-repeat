export interface IUser {
  _id?: string;
  name: string;
  age: number;
  phone?: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
