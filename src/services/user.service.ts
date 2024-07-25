import { IPrivateUser, IPublicUser } from "../interfaces/user.intefrace";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IPublicUser[]> {
    return await userRepository.getList();
  }
  public async getById(userId: string): Promise<IPublicUser> {
    return await userRepository.getById(userId);
  }
  public async getMe(userId: string): Promise<IPrivateUser> {
    return await userRepository.getMe(userId);
  }

  public async updateMe(
    userId: string,
    dto: IPrivateUser,
  ): Promise<IPrivateUser> {
    return await userRepository.updateMe(userId, dto);
  }
  public async deleteMe(userId: string): Promise<void> {
    await userRepository.deleteMe(userId);
  }
}

export const userService = new UserService();
