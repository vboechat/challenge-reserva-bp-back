import { Module } from "@nestjs/common";

import { PrismaService } from "../../common/services/prisma.service";
import { BrokersModule } from "../brokers/brokers.module";
import { ScheduleController } from "./controllers/schedule.controller";
import { SchedulesRepository } from "./repository/schedules.repository";
import { SchedulesRepositoryInterface } from "./repository/schedules.repository.interface";
import { SchedulesService } from "./services/schedules.service";
import { SchedulesServiceInterface } from "./services/schedules.service.interface";

@Module({
  exports: [],
  imports: [BrokersModule],
  controllers: [ScheduleController],
  providers: [
    {
      provide: SchedulesRepositoryInterface,
      useClass: SchedulesRepository,
    },
    {
      provide: SchedulesServiceInterface,
      useClass: SchedulesService,
    },
    PrismaService,
  ],
})
export class SchedulesModule {}
