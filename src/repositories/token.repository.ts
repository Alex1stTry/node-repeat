import { FilterQuery } from "mongoose";

import { ITokensPair } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(tokens: ITokensPair): Promise<ITokensPair> {
    return await Token.create(tokens);
  }
  public async findByParams(
    params: FilterQuery<ITokensPair>,
  ): Promise<ITokensPair> {
    return await Token.findOne(params);
  }
  public async deleteById(userId: string): Promise<void> {
    await Token.findByIdAndDelete(userId);
  }
}
export const tokenRepository = new TokenRepository();
