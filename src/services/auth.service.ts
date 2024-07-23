import { ApiError } from "../errors/api-error";
import { ITokenPayload, ITokens } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.intefrace";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { hashService } from "./hash.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(dto: IUser): Promise<void> {
    await this.isEmailExist(dto.email);
    const hashedPassword = await hashService.hash(dto.password);
    await userRepository.create({ ...dto, password: hashedPassword });
  }
  private async isEmailExist(email: string) {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("email is already exist", 409);
    }
  }
  public async login(
    dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokens }> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Incorrect credentials", 401);
    }
    const correctPassword = await hashService.compare(
      dto.password,
      user.password,
    );
    if (!correctPassword) {
      throw new ApiError("Incorrect credentials", 401);
    }
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return {
      user,
      tokens,
    };
  }
  public async refresh(payload: ITokenPayload): Promise<any> {
    const { userId } = payload;
    console.log(userId);
  }
}
export const authService = new AuthService();
