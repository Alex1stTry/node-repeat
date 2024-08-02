import * as jwt from "jsonwebtoken";

import { Configs } from "../configs/configs";
import { ActionTokenTypeEnum } from "../enums/action.tokenType.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/tokens.interface";

class ActionTokenService {
  public generateActionToken(
    payload: ITokenPayload,
    type: ActionTokenTypeEnum,
  ): string {
    let secret: string;
    let expiresIn: string;
    switch (type) {
      case ActionTokenTypeEnum.VERIFY:
        secret = Configs.VERIFY_ACTION_TOKEN_SECRET;
        expiresIn = Configs.VERIFY_ACTION_TOKEN_EXPIRE_IN;
        break;
      case ActionTokenTypeEnum.FORGOT_PASSWORD:
        secret = Configs.FORGOT_ACTION_TOKEN_SECRET;
        expiresIn = Configs.FORGOT_ACTION_TOKEN_EXPIRE_IN;
    }
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  }
  public verifyActionToken(
    token: string,
    type: ActionTokenTypeEnum,
  ): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case ActionTokenTypeEnum.VERIFY:
          secret = Configs.VERIFY_ACTION_TOKEN_SECRET;
          break;
        case ActionTokenTypeEnum.FORGOT_PASSWORD:
          secret = Configs.FORGOT_ACTION_TOKEN_SECRET;
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
export const actionTokenService = new ActionTokenService();
