import { Injectable } from "@nestjs/common";

import { AccountEntity } from "../../../common/entity/account.entity";
import { AccountRoleType } from "../../../common/enums/account-role.enum";
import { PrismaService } from "../../../common/services/prisma.service";
import { RequestUserDto } from "../dtos/request.user.dto";
import { UserRepositoryInterface } from "./user.repository.interface";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(
    userDto: RequestUserDto,
    role?: AccountRoleType,
  ): Promise<AccountEntity> {
    const user = await this.prisma.accounts.create({
      data: {
        username: userDto.username,
        email: userDto.email,
        password: userDto.password,
        role,
      },
    });

    return user;
  }

  async findOne(email: string): Promise<AccountEntity> {
    const user = await this.prisma.accounts.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
