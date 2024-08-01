import * as jwt from "jsonwebtoken";

import { Configs } from "../configs/configs";
import { ActionTokenTypeEnum } from "../enums/action.tokenType.enum";
import { ITokenPayload } from "../interfaces/tokens.interface";

class ActionTokenService {
  public generateActionToken(payload: ITokenPayload): string {
    return jwt.sign(payload, Configs.VERIFY_ACTION_TOKEN_SECRET, {
      expiresIn: Configs.VERIFY_ACTION_TOKEN_EXPIRE_IN,
    });
  }
  public verifyActionToken(
    token: string,
    type: ActionTokenTypeEnum,
  ): ITokenPayload {
    let secret: string;
    switch (type) {
      case ActionTokenTypeEnum.VERIFY:
        secret = Configs.VERIFY_ACTION_TOKEN_SECRET;
        break;
    }
    return jwt.verify(token, secret) as ITokenPayload;
  }
}
export const actionTokenService = new ActionTokenService();
