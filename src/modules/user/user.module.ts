import { Module } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";

import { UserRepository } from "./repository/user.repository";
import { UserRepositoryInterface } from "./repository/user.repository.interface";
import { UserService } from "./services/user.service";
import { UserServiceInterface } from "./services/user.service.interface";

@Module({
  exports: [
    {
      provide: UserServiceInterface,
      useClass: UserService,
    },
  ],
  providers: [
    {
      provide: UserServiceInterface,
      useClass: UserService,
    },
    {
      provide: UserRepositoryInterface,
      useClass: UserRepository,
    },
    PrismaService,
  ],
})
export class UserModule {}
