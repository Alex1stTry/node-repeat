import { UploadedFile } from "express-fileupload";

import { FolderS3Enum } from "../enums/folder.s3.enum";
import { IPrivateUser, IPublicUser } from "../interfaces/user.intefrace";
import { userRepository } from "../repositories/user.repository";
import { UserRepresenter } from "../representers/user.representer";
import { s3Service } from "./s3.service";

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
    return await userRepository.getMe(userId);
  }

  public async updateMe(
    userId: string,
    dto: Partial<IPrivateUser>,
  ): Promise<IPrivateUser> {
    return await userRepository.updateMe(userId, dto);
  }
  public async deleteMe(userId: string): Promise<void> {
    await userRepository.deleteMe(userId);
  }
  public async uploadAvatar(
    userId: string,
    file: UploadedFile,
  ): Promise<IPrivateUser> {
    const user = await userRepository.getMe(userId);
    if (user.avatar) {
      await s3Service.deleteAvatar(user.avatar);
    }
    const avatar = await s3Service.uploadFile(FolderS3Enum.USER, userId, file);

    return await userRepository.updateMe(userId, { avatar });
  }
  public async deleteAvatar(userId: string): Promise<IPrivateUser> {
    const user = await userRepository.getById(userId);

    if (user.avatar) {
      await s3Service.deleteAvatar(user.avatar);
    }

    return await userRepository.updateMe(userId, { avatar: null });
  }
}

export const userService = new UserService();
