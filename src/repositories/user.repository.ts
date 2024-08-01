import { IPrivateUser, IPublicUser, IUser } from "../interfaces/user.intefrace";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IPublicUser[]> {
    return await User.find();
  }
  public async getById(userId: string): Promise<IPublicUser> {
    return await User.findById(userId);
  }
  public async getMe(userId: string): Promise<IPrivateUser> {
    return await User.findById(userId);
  }
  public async create(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }
  public async getByParams(params: Partial<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }
  public async updateMe(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }
  public async deleteMe(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
}
export const userRepository = new UserRepository();
