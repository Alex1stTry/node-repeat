import { ApiError } from "../errors/api-error";
import { userHelper } from "../helper";
import { IUser } from "../interfaces/user.interface";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await userHelper.reader();
  }
  public async create(dto: IUser): Promise<IUser> {
    const users = await this.getList();
    const index = users.findIndex((user) => user.email === dto.email);
    if (index !== -1) {
      throw new ApiError("User with this email already exist", 400);
    }
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await userHelper.writer(users);
    return newUser;
  }
  public async getById(userId: number): Promise<IUser> {
    const users = await this.getList();
    return users.find((user) => user.id === userId);
  }
  public async deleteById(userId: number): Promise<void> {
    const users = await this.getList();
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new ApiError("User not found or have already removed", 404);
    }
    users.splice(userIndex, 1);
    await userHelper.writer(users);
  }
  public async updateById(userId: number, dto: IUser): Promise<IUser> {
    const users = await this.getList();
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
      throw new ApiError("user not found", 404);
    }
    users[index] = {
      ...users[index],
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    await userHelper.writer(users);
    return users[index];
  }
}
export const userRepository = new UserRepository();
