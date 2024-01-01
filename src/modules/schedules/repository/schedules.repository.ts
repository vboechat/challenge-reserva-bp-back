import { Injectable } from "@nestjs/common";

import { AccountRoleType } from "../../../common/enums/account-role.enum";
import { PrismaService } from "../../../common/services/prisma.service";
import { CreateScheduleRequestDto } from "../dtos/create-request.dto";
import { ScheduleEntity } from "../entities/schedule.entity";
import { SchedulesRepositoryInterface } from "./schedules.repository.interface";

@Injectable()
export class SchedulesRepository implements SchedulesRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async createSchedule(
    scheduleData: CreateScheduleRequestDto,
    userId: number,
  ): Promise<ScheduleEntity> {
    const schedule = await this.prismaService.schedules.create({
      data: { ...scheduleData, clientId: userId },
      include: {
        client: true,
        broker: true,
      },
    });

    return schedule;
  }

  async getSchedules(
    userId: number,
    userRole: AccountRoleType,
  ): Promise<ScheduleEntity[]> {
    const where =
      userRole === "BROKER" ? { brokerId: userId } : { clientId: userId };

    const schedules = await this.prismaService.schedules.findMany({
      where: where,
      include: {
        client: true,
        broker: true,
      },
    });

    return schedules;
  }

  /**
   * @returns true if broker is busy
   * @returns false is broker is not busy
   */
  async isBrokerBusy(scheduleData: CreateScheduleRequestDto): Promise<boolean> {
    const schedule = await this.prismaService.schedules.findFirst({
      where: {
        brokerId: scheduleData.brokerId,
        fromDate: {
          gte: scheduleData.fromDate,
        },
        toDate: {
          lte: scheduleData.toDate,
        },
      },
    });

    const isBusy = schedule ? true : false;

    return isBusy;
  }
}
