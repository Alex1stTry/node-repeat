import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

import { userValidator } from "../validators/user.validator";

class ValidationMiddleware {
  private schema: Schema;
  constructor(schema: Schema) {
    this.schema = schema;
  }
  public isBodyValid() {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error } = this.schema.validate(req.body);
        console.log(error);
      } catch (e) {
        next(e);
      }
    };
  }
}

export const validationMiddleware = new ValidationMiddleware(userValidator);
