import { NextFunction, Request, Response } from "express";

import { ITokenPayload, ITokensPair } from "../interfaces/tokens.interface";
import { ILogin, IUser } from "../interfaces/user.intefrace";
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
      const dto = req.body as ILogin;
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
  public async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as ITokenPayload;
      await authService.logOut(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async verifyAndUpdate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const payload = req.res.locals.jwtPayload as ITokenPayload;
      await authService.verifyAndUpdate(payload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async forgotPass(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.jwtPayload as ITokenPayload;
      await authService.forgotPass(payload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async setForgotPass(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as Partial<IUser>;

      await authService.setForgotPass(payload, dto);

      res.json("Password updated");
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
