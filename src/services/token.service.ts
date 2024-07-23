import * as jwt from "jsonwebtoken";

import { Configs } from "../configs/configs";
import { TokenType } from "../enums/tokenType.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPayload, ITokens } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokens {
    const accessToken = jwt.sign(payload, Configs.ACCESS_SECRET_KEY, {
      expiresIn: Configs.ACCESS_EXPIRE_IN,
    });
    const refreshToken = jwt.sign(payload, Configs.REFRESH_SECRET_KEY, {
      expiresIn: Configs.REFRESH_EXPIRE_IN,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  public verify(token: string, tokenType: TokenType): ITokenPayload {
    try {
      let secret: string;
      switch (tokenType) {
        case TokenType.ACCESS:
          secret = Configs.ACCESS_SECRET_KEY;
          break;
        case TokenType.REFRESH:
          secret = Configs.REFRESH_SECRET_KEY;
          break;
        default:
          throw new ApiError("Invalid token", 401);
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError(e.message, 401);
    }
  }
}
export const tokenService = new TokenService();
