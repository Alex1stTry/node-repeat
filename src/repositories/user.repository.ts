import { IUser } from "../interfaces/user.inteface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }
  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
  public async create(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }
  public async getByParams(params: Partial<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }
  public async updateById(userId: string, dto: IUser): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }
  public async deleteById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}
export const userRepository = new UserRepository();
