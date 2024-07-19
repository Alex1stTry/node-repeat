import joi from "joi";

import { regex } from "../constants/regex";

export class UserValidator {
  private static name = joi.string().trim().min(3).max(30).required();
  private static age = joi.number().min(18).max(60).required();
  private static email = joi.string().trim().pattern(regex.EMAIL).required();
  private static password = joi
    .string()
    .trim()
    .pattern(regex.PASSWORD)
    .required();
  private static phone = joi.string().trim().pattern(regex.PHONE).optional();

  public static createUser = joi.object({
    name: UserValidator.name,
    age: UserValidator.age,
    email: UserValidator.email,
    password: UserValidator.password,
    phone: UserValidator.phone,
  });

  public static updateUser = joi.object({
    name: UserValidator.name,
    age: UserValidator.age,
    email: UserValidator.email,
    phone: UserValidator.phone,
  });
}
