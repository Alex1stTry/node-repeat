import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async create(dto: IUser): Promise<IUser> {
    return await userRepository.create(dto);
  }
  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }
  public async deleteById(userId: string): Promise<void> {
    await userRepository.deleteById(userId);
  }
  public async updateById(userId: string, dto: IUser): Promise<IUser> {
    return await userRepository.updateById(userId, dto);
  }
}

export const userService = new UserService();
