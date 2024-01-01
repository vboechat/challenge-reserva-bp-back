import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { SignInUserDto } from "../../../modules/user/dtos/sign-in.user.dto";
import { User } from "../decorators/user.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { AuthServiceInterface } from "../services/auth.service.interface";
import { UserPayloadEntity } from "../types/payload.type";
import { SignInResponse } from "../types/sign-in.response.type";
import { AuthControllerInterface } from "./auth.controller.interface";

@Controller("auth")
@ApiTags("auth")
export class AuthController implements AuthControllerInterface {
  constructor(private authService: AuthServiceInterface) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  async signUp(@Body() signUpDto: RequestUserDto): Promise<void> {
    await this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() signInDto: SignInUserDto): Promise<SignInResponse> {
    const response = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    return response;
  }

  @UseGuards(AuthGuard)
  @Get("user")
  async getUser(@User() user: UserPayloadEntity): Promise<UserPayloadEntity> {
    return user;
  }
}
