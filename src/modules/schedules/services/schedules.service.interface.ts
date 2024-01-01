import { UserPayloadEntity } from "../../../modules/auth/types/payload.type";
import { CreateScheduleRequestDto } from "../dtos/create-request.dto";
import { ScheduleEntity } from "../entities/schedule.entity";

export abstract class SchedulesServiceInterface {
  abstract createSchedule(
    user: UserPayloadEntity,
    scheduleData: CreateScheduleRequestDto,
  ): Promise<ScheduleEntity>;
  abstract getSchedules(user: UserPayloadEntity): Promise<ScheduleEntity[]>;
}
