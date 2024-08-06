import { NextFunction, Request, Response } from "express";

import { ActionTokenTypeEnum } from "../enums/action.token-type.enum";
import { TokenType } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/tokens.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { actionTokenService } from "../services/action.token.service";
import { tokenService } from "../services/token.service";

class TokenMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("Token isn`t provided", 401);
      }
      const token = header.split("Bearer ")[1];
      const payload = tokenService.verify(token, TokenType.ACCESS);

      const pair = tokenRepository.findByParams({ accessToken: token });
      if (!pair) {
        throw new ApiError("Invalid token", 401);
      }

      req.res.locals.jwtPayload = payload as ITokenPayload;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("Token isn`t provided", 401);
      }
      const token = header.split("Bearer ")[1];
      const payload = tokenService.verify(token, TokenType.REFRESH);

      const tokenPair = await tokenRepository.findByParams({
        refreshToken: token,
      });
      if (!tokenPair) {
        throw new ApiError("Invalid token", 401);
      }
      req.res.locals.jwtPayload = payload;
      req.res.locals.tokenPair = tokenPair;
      next();
    } catch (e) {
      next(e);
    }
  }
  public checkActionToken(type: ActionTokenTypeEnum) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actionToken = req.headers.authorization;
        if (!actionToken) {
          throw new ApiError("actionToken isn`t provided", 401);
        }
        const payload = actionTokenService.verifyActionToken(actionToken, type);

        const data = await actionTokenRepository.find(actionToken);
        if (!data) {
          throw new ApiError("Invalid token", 401);
        }
        req.res.locals.jwtPayload = payload;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const tokenMiddleware = new TokenMiddleware();
