import { EmailEnum } from "../enums/email.enum";
import { ApiError } from "../errors/api-error";
import {
  ITokenPayload,
  ITokens,
  ITokensPair,
} from "../interfaces/token.interface";
import { ILogin, IUser } from "../interfaces/user.intefrace";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { hashService } from "./hash.service";
import { mailService } from "./mail.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(dto: IUser): Promise<void> {
    await this.isEmailExist(dto.email);
    const hashedPassword = await hashService.hash(dto.password);
    await userRepository.create({ ...dto, password: hashedPassword });
    await mailService.sendEmail(EmailEnum.WELCOME, dto.email, {
      name: dto.name,
    });
  }

  public async login(dto: ILogin): Promise<{ user: IUser; tokens: ITokens }> {
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

  public async refresh(
    jwtPayload: ITokenPayload,
    oldPair: ITokensPair,
  ): Promise<ITokens> {
    const newPair = tokenService.generateTokens({
      userId: jwtPayload.userId,
      role: jwtPayload.role,
    });
    await tokenRepository.deleteById(oldPair._id);
    await tokenRepository.create({
      ...newPair,
      _userId: jwtPayload.userId,
    });
    return newPair;
  }

  public async logOut(userId: string): Promise<void> {
    await tokenRepository.deleteByParams({ _userId: userId });
    const user = await userRepository.getMe(userId);
    await mailService.sendEmail(EmailEnum.LOG_OUT, user.email, {
      name: user.name,
      frontUrl: "http://forms",
    });
  }

  private async isEmailExist(email: string) {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("email is already exist", 409);
    }
  }
}
export const authService = new AuthService();
