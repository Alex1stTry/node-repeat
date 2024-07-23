import { NextFunction, Request, Response } from "express";

import { ITokenPayload, ITokensPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.intefrace";
import { authService } from "../services/auth.service";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      await authService.register(dto);
      res.status(201).json({
        message: "User created",
      });
    } catch (e) {
      next(e);
    }
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;
      const result = await authService.login(dto);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const tokenPair = req.res.locals.tokenPair as ITokensPair;
      const data = await authService.refresh(jwtPayload, tokenPair);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
