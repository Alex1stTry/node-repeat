import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/tokens.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getList();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as ITokenPayload;
      const me = await userService.getMe(userId);
      if (!me) {
        throw new ApiError("User not found", 404);
      }
      res.json(me);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await userService.getById(userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as any;
      const updatedUser = await userService.updateMe(userId, dto);
      if (!updatedUser) {
        throw new ApiError("User not found", 404);
      }
      res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as ITokenPayload;
      await userService.deleteMe(userId);
      res.json({
        message: "User was deleted",
      });
    } catch (e) {
      next(e);
    }
  }
  public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const avatar = req.files?.avatar as UploadedFile;
      const { userId } = req.res.locals.jwtPayload;
      const user = await userService.uploadAvatar(userId, avatar);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async deleteAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload;
      const user = await userService.deleteAvatar(userId);

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
