import { UserPayloadEntity } from "../../../modules/auth/types/payload.type";
import { CreateScheduleRequestDto } from "../dtos/create-request.dto";
import { ScheduleEntity } from "../entities/schedule.entity";

export interface SchedulesControllerInterface {
  getSchedules(user: UserPayloadEntity): Promise<ScheduleEntity[]>;
  scheduleTime(
    user: UserPayloadEntity,
    request: CreateScheduleRequestDto,
  ): Promise<ScheduleEntity>;
}
