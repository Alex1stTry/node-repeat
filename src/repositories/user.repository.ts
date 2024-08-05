import { IPrivateUser, IPublicUser, IUser } from "../interfaces/user.intefrace";
import { Token } from "../models/token.model";
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
