import joi from "joi";

import { regexConstants } from "../constants/regex.constants";

export class UserValidator {
  private static name = joi.string().required().trim().min(3).max(15);
  private static age = joi.number().required().min(18).max(60);
  private static email = joi
    .string()
    .pattern(regexConstants.EMAIL)
    .required()
    .trim();
  private static password = joi
    .string()
    .pattern(regexConstants.PASSWORD)
    .required()
    .trim();
  private static phone = joi.string().pattern(regexConstants.PHONE).optional();

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
