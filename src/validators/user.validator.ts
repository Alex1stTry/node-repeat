import joi from "joi";

import { regexConstants } from "../constants/regex.constants";

export class UserValidator {
  private static name = joi.string().trim().min(3).max(15);
  private static age = joi.number().min(18).max(60);
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
    name: UserValidator.name.required(),
    age: UserValidator.age.required(),
    email: UserValidator.email.required(),
    password: UserValidator.password.required(),
    phone: UserValidator.phone.optional(),
  });

  public static updateUser = joi.object({
    name: UserValidator.name.optional(),
    age: UserValidator.age.optional(),
    email: UserValidator.email.optional(),
    phone: UserValidator.phone.optional(),
  });
  public static login = joi.object({
    email: UserValidator.email.required(),
    password: UserValidator.password.required(),
  });
}
