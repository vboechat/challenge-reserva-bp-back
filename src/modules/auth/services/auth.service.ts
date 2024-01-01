import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { parseTokenDuration } from "../../../common/utils/parse-jwt-duration";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UserServiceInterface } from "../../../modules/user/services/user.service.interface";
import { SignInResponse } from "../types/sign-in.response.type";
import { AuthServiceInterface } from "./auth.service.interface";

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly userService: UserServiceInterface,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: RequestUserDto): Promise<void> {
    const isRestrictionsAllowed = process.env.ALLOW_RESTRICTIONS === "true";

    if (!isRestrictionsAllowed) {
      throw new UnauthorizedException(
        "You can only register an user by this endpoint when ALLOW_RESTRICTIONS environment variable is set to true.",
      );
    }

    await this.userService.create(signUpDto, "BROKER");
  }

  async signIn(email: string, password: string): Promise<SignInResponse> {
    const user = await this.userService.findOne(email);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: [user.role],
    };

    const generateToken = await this.jwtService.signAsync(payload);
    const durationSeconds = parseTokenDuration() * 24 * 60 * 60;

    const response = {
      token: generateToken,
      expiresIn: durationSeconds,
    };

    return response;
  }
}
