import { ConflictException, Injectable } from "@nestjs/common";

import { UserPayloadEntity } from "../../../modules/auth/types/payload.type";
import { BrokerServiceInterface } from "../../../modules/brokers/services/broker.service.interface";
import { CreateScheduleRequestDto } from "../dtos/create-request.dto";
import { ScheduleEntity } from "../entities/schedule.entity";
import { SchedulesRepositoryInterface } from "../repository/schedules.repository.interface";
import checkDuration from "../utils/check-duration";
import { SchedulesServiceInterface } from "./schedules.service.interface";

@Injectable()
export class SchedulesService implements SchedulesServiceInterface {
  constructor(
    private readonly brokersService: BrokerServiceInterface,
    private readonly schedulesRepository: SchedulesRepositoryInterface,
  ) {}

  async createSchedule(
    user: UserPayloadEntity,
    scheduleData: CreateScheduleRequestDto,
  ): Promise<ScheduleEntity> {
    const userId = user.sub;
    const brokerId = scheduleData.brokerId;

    if (userId === brokerId) {
      throw new ConflictException("Você não pode agendar com você mesmo");
    }

    const broker = await this.brokersService.getBrokerById(brokerId);

    if (!broker) {
      throw new ConflictException("Corretor não encontrado");
    }

    checkDuration(scheduleData.fromDate, scheduleData.toDate);
    const isBrokerBusy =
      await this.schedulesRepository.isBrokerBusy(scheduleData);

    if (isBrokerBusy) {
      throw new ConflictException("O corretor está ocupado");
    }

    const schedule = await this.schedulesRepository.createSchedule(
      scheduleData,
      userId,
    );

    delete schedule.client.password;
    delete schedule.broker.password;

    return schedule;
  }

  async getSchedules(user: UserPayloadEntity): Promise<ScheduleEntity[]> {
    const userId = user.sub;

    const schedules = await this.schedulesRepository.getSchedules(
      userId,
      user.role[0],
    );

    schedules.forEach((schedule) => {
      delete schedule.client.password;
      delete schedule.broker.password;
    });

    return schedules;
  }
}
