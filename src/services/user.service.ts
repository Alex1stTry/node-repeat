import { IPrivateUser, IPublicUser } from "../interfaces/user.intefrace";
import { userRepository } from "../repositories/user.repository";
import { UserRepresenter } from "../representers/user.representer";

class UserService {
  public async getList(): Promise<IPublicUser[]> {
    const result = await userRepository.getList();
    return UserRepresenter.toPublicResponseList(result);
  }
  public async getById(userId: string): Promise<IPublicUser> {
    const user = await userRepository.getById(userId);
    return UserRepresenter.toPublicResponseDto(user);
  }
  public async getMe(userId: string): Promise<IPrivateUser> {
    const result = await userRepository.getMe(userId);
    return UserRepresenter.toPrivateResponseDto(result);
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
