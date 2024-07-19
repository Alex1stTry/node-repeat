import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }
  public async create(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }
  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
  public async deleteById(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
  public async updateById(userId: string, dto: IUser): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, {
      name: dto.name,
      age: dto.age,
      email: dto.email,
      phone: dto.phone,
    });
  }
}
export const userRepository = new UserRepository();
