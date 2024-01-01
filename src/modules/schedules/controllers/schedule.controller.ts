import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AccountRole } from "src/common/enums/account-role.enum";
import { Role } from "src/modules/auth/decorators/has-role.decorator";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { RolesGuard } from "src/modules/auth/guards/role.guard";

import { User } from "../../../modules/auth/decorators/user.decorator";
import { UserPayloadEntity } from "../../../modules/auth/types/payload.type";
import { CreateScheduleRequestDto } from "../dtos/create-request.dto";
import { ScheduleEntity } from "../entities/schedule.entity";
import { SchedulesServiceInterface } from "../services/schedules.service.interface";
import { SchedulesControllerInterface } from "./schedules.controller.interface";

@Controller("schedules")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags("schedules")
export class ScheduleController implements SchedulesControllerInterface {
  constructor(private readonly scheduleService: SchedulesServiceInterface) {}

  @Get()
  async getSchedules(
    @User() user: UserPayloadEntity,
  ): Promise<ScheduleEntity[]> {
    const schedule = await this.scheduleService.getSchedules(user);

    return schedule;
  }

  @Post()
  @Role(AccountRole.CLIENT)
  @ApiUnauthorizedResponse({ description: "Invalid credentials" })
  @ApiForbiddenResponse({ description: "You are not a client" })
  @ApiConflictResponse({ description: "Broker is busy in this time" })
  async scheduleTime(
    @User() user: UserPayloadEntity,
    @Body() request: CreateScheduleRequestDto,
  ): Promise<ScheduleEntity> {
    const schedule = await this.scheduleService.createSchedule(user, request);

    return schedule;
  }
}
