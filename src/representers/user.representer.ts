import { Configs } from "../configs/configs";
import { IPrivateUser, IPublicUser, IUser } from "../interfaces/user.intefrace";

export class UserRepresenter {
  public static toPrivateResponseDto(data: IUser): IPrivateUser {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar ? `${Configs.AWS_ENDPOINT}/${data.avatar}` : null,
    };
  }
  public static toPublicResponseDto(data: IUser): IPublicUser {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
      avatar: data.avatar ? `${Configs.AWS_ENDPOINT}/${data.avatar}` : null,
    };
  }
  public static toPublicResponseList(users: IUser[]) {
    return users.map((user) => this.toPublicResponseDto(user));
  }
}
