import { IPrivateUser, IUser } from "../interfaces/user.intefrace";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";
import { UserRepresenter } from "../representers/user.representer";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }
  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
  public async getMe(userId: string): Promise<IPrivateUser> {
    const user = await User.findById(userId);
    return UserRepresenter.toPrivateResponseDto(user);
  }
  public async create(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }
  public async getByParams(params: Partial<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }
  public async updateMe(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IPrivateUser> {
    const user = await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
    return UserRepresenter.toPrivateResponseDto(user);
  }
  public async deleteMe(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
  public async findOldVisitors(date: Date): Promise<IUser[]> {
    return await User.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
            { $match: { createdAt: { $gt: date } } },
          ],
          as: "tokens",
        },
      },
      {
        $match: { tokens: { $size: 0 } },
      },
    ]);
  }
}
export const userRepository = new UserRepository();
