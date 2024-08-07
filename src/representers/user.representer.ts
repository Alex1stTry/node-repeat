import { IPrivateUser, IUser } from "../interfaces/user.intefrace";

export class UserRepresenter {
  public static toPrivateResponseDto(data: IUser) {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
    } as IPrivateUser;
  }
  public static toPublicResponseDto(data: IUser) {
    return {
      _id: data._id,
      name: data.name,
      age: data.age,
    };
  }
  public static toPublicResponseList(users: IUser[]) {
    return users.map((user) => this.toPublicResponseDto(user));
  }
}
