import * as bcrypt from "bcrypt";

import { Configs } from "../configs/configs";

class HashService {
  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, Configs.COUNT_OF_SALT);
  }
  public async compare(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
export const hashService = new HashService();
