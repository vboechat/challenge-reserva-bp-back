import { Module } from "@nestjs/common";

import { PrismaService } from "../../common/services/prisma.service";
import { UserModule } from "../user/user.module";
import { BrokerController } from "./controllers/broker.controller";
import { BrokerRepository } from "./repositories/broker.repository";
import { BrokerRepositoryInterface } from "./repositories/broker.repository.interface";
import { BrokerService } from "./services/broker.service";
import { BrokerServiceInterface } from "./services/broker.service.interface";

@Module({
  exports: [
    {
      provide: BrokerServiceInterface,
      useClass: BrokerService,
    },
  ],
  imports: [UserModule],
  controllers: [BrokerController],
  providers: [
    {
      provide: BrokerServiceInterface,
      useClass: BrokerService,
    },
    {
      provide: BrokerRepositoryInterface,
      useClass: BrokerRepository,
    },
    PrismaService,
  ],
})
export class BrokersModule {}
