import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api-error";

class AvatarMiddleware {
  public isAvatarValid(
    paramName: string,
    config: { MAX_SIZE: number; MIMETYPES: string[] },
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const avatar = req.files?.[paramName] as UploadedFile;
        if (!avatar) {
          throw new ApiError("Avatar isn`t found", 400);
        }
        if (avatar.size > config.MAX_SIZE) {
          throw new ApiError("Max size of avatar is 5MB", 400);
        }
        if (!config.MIMETYPES.includes(avatar.mimetype)) {
          throw new ApiError("Invalid mimetype", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const avatarMiddleware = new AvatarMiddleware();
