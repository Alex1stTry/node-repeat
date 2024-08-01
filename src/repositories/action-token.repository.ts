import { IActionToken } from "../interfaces/tokens.interface";
import { ActionToken } from "../models/action-model";

class ActionTokenRepository {
  public async create(token: IActionToken): Promise<IActionToken> {
    return await ActionToken.create(token);
  }
  public async find(actionToken: string): Promise<IActionToken> {
    return await ActionToken.findOne({ actionToken });
  }
}
export const actionTokenRepository = new ActionTokenRepository();
