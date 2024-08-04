import { FilterQuery } from "mongoose";

import { ITokensPair } from "../interfaces/tokens.interface";
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
  public async deleteByParams(params: FilterQuery<ITokensPair>): Promise<void> {
    await Token.deleteMany(params);
  }
}
export const tokenRepository = new TokenRepository();
