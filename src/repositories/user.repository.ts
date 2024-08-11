import { FilterQuery, SortOrder } from "mongoose";

import { userOrderByEnum } from "../enums/user-orderBy.enum";
import { ApiError } from "../errors/api-error";
import {
  IPrivateUser,
  IUser,
  IUserQueryList,
} from "../interfaces/user.intefrace";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(query: IUserQueryList): Promise<[IUser[], number]> {
    const skip = (query.page - 1) * query.limit;

    const filterUser: FilterQuery<IUser> = { isVerified: true };
    // if (query.search) {
    //   filterUser.$or = [
    //     { name: { $regex: query.search, $options: "i" } },
    //     { email: { $regex: query.search, $options: "i" } },
    //   ];
    // }
    const sortUser: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
      case userOrderByEnum.ID:
        sortUser.id = query.order;
        break;
      case userOrderByEnum.AGE:
        sortUser.age = query.order;
        break;
      case userOrderByEnum.NAME:
        sortUser.name = query.order;
        break;
      default:
        throw new ApiError("Invalid orderBy", 400);
    }

    return await Promise.all([
      User.find(filterUser).limit(query.limit).skip(skip).sort(sortUser),
      User.countDocuments(filterUser),
    ]);
  }
  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
  public async getMe(userId: string): Promise<IUser> {
    return await User.findById(userId);
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
