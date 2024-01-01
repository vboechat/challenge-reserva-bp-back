import { Module } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";

import { UserModule } from "../user/user.module";
import { ClientController } from "./controller/client.controller";
import { ClientRepository } from "./repositories/client.repository";
import { ClientRepositoryInterface } from "./repositories/client.repository.interface";
import { ClientService } from "./services/client.service";
import { ClientServiceInterface } from "./services/client.service.interface";

@Module({
  imports: [UserModule],
  controllers: [ClientController],
  providers: [
    {
      provide: ClientServiceInterface,
      useClass: ClientService,
    },
    {
      provide: ClientRepositoryInterface,
      useClass: ClientRepository,
    },
    PrismaService,
  ],
})
export class ClientModule {}
