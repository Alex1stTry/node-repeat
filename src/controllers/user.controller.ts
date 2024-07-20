import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.inteface";
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
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const user = await userService.create(dto);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const dto = req.body as IUser;
      const updatedUser = await userService.updateById(userId, dto);
      if (!updatedUser) {
        throw new ApiError("User not found", 404);
      }
      res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      await userService.deleteById(userId);
      res.json("User was deleted");
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
