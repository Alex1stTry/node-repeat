import { FilterQuery } from "mongoose";

import { IOldPass } from "../interfaces/old-pass.interface";
import { OldPass } from "../models/old-password-model";

class OldPasswordRepository {
  public async create(dto: IOldPass): Promise<IOldPass> {
    return await OldPass.create(dto);
  }

  public async findByUserId(userId: string): Promise<IOldPass[]> {
    return await OldPass.find({ _userId: userId });
  }

  public async deleteByParams(params: FilterQuery<IOldPass>) {
    await OldPass.deleteMany(params);
  }
}
export const oldPassRepository = new OldPasswordRepository();
