import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { AccountEntity } from "../../../common/entity/account.entity";
import { AccountRoleType } from "../../../common/enums/account-role.enum";
import { RequestUserDto } from "../dtos/request.user.dto";
import { UserRepositoryInterface } from "../repository/user.repository.interface";
import { UserServiceInterface } from "./user.service.interface";

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async create(
    userDto: RequestUserDto,
    role?: AccountRoleType,
  ): Promise<AccountEntity> {
    const userExists = await this.userRepository.findOne(userDto.email);

    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword = await this.hashPassword(userDto.password);
    userDto.password = hashedPassword;

    const user = await this.userRepository.create(userDto, role);

    return user;
  }

  async findOne(email: string): Promise<AccountEntity> {
    const user = await this.userRepository.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = Number(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return hashedPassword;
  }
}
