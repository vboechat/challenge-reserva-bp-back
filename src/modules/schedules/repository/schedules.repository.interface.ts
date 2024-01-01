import { AccountRoleType } from "../../../common/enums/account-role.enum";
import { CreateScheduleRequestDto } from "../dtos/create-request.dto";
import { ScheduleEntity } from "../entities/schedule.entity";

export abstract class SchedulesRepositoryInterface {
  abstract createSchedule(
    scheduleData: CreateScheduleRequestDto,
    userId: number,
  ): Promise<ScheduleEntity>;
  abstract getSchedules(
    userId: number,
    userRole: AccountRoleType,
  ): Promise<ScheduleEntity[]>;
  abstract isBrokerBusy(
    scheduleData: CreateScheduleRequestDto,
  ): Promise<boolean>;
}
