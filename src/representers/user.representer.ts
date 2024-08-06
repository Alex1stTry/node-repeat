import { IPrivateUser, IPublicUser, IUser } from "../interfaces/user.intefrace";

export class UserRepresenter {
  public static toPrivateResponseDto(data: IUser): IPrivateUser {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
    };
  }
  public static toPublicResponseDro(data: IUser): IPublicUser {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
    };
  }
}
