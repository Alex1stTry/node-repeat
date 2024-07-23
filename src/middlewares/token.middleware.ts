import { NextFunction, Request, Response } from "express";

import { TokenType } from "../enums/tokenType.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";
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
}
export const tokenMiddleware = new TokenMiddleware();
