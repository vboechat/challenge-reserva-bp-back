import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { AccountEntity } from "../../../common/entity/account.entity";
import { AccountRole } from "../../../common/enums/account-role.enum";
import { ParseIdPipe } from "../../../common/pipes/parse-id.pipe";
import { Role } from "../../../modules/auth/decorators/has-role.decorator";
import { User } from "../../../modules/auth/decorators/user.decorator";
import { AuthGuard } from "../../../modules/auth/guards/auth.guard";
import { RolesGuard } from "../../../modules/auth/guards/role.guard";
import { UserPayloadEntity } from "../../../modules/auth/types/payload.type";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";
import { BrokerServiceInterface } from "../services/broker.service.interface";
import { BrokerControllerInterface } from "./broker.controller.interface";

@Controller("broker")
@ApiBearerAuth()
@ApiTags("brokers")
@UseGuards(AuthGuard, RolesGuard)
export class BrokerController implements BrokerControllerInterface {
  constructor(private readonly brokerService: BrokerServiceInterface) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Role(AccountRole.BROKER)
  @ApiCreatedResponse({ description: "Broker created" })
  @ApiConflictResponse({ description: "Broker already exists" })
  @ApiBadRequestResponse({ description: "Invalid request body" })
  async createBroker(@Body() broker: RequestUserDto): Promise<void> {
    await this.brokerService.createBroker(broker);
  }

  @Get()
  @ApiOkResponse({ description: "Brokers found" })
  @ApiBadRequestResponse({ description: "Invalid request query params value" })
  async getBrokers(
    @Query("page") page?: PaginationDto,
  ): Promise<Array<AccountEntity>> {
    const brokers = await this.brokerService.getBrokers(page);

    return brokers;
  }

  @Get(":id")
  @ApiOkResponse({ description: "Broker found" })
  @ApiBadRequestResponse({ description: "Invalid request params value" })
  @ApiNotFoundResponse({ description: "Broker not found" })
  async getBrokerById(
    @Param("id", ParseIdPipe) id: number,
  ): Promise<AccountEntity> {
    const broker = await this.brokerService.getBrokerById(id);

    return broker;
  }

  @Patch()
  @Role(AccountRole.BROKER)
  @ApiOkResponse({ description: "Broker updated" })
  @ApiBadRequestResponse({ description: "Invalid request body" })
  @ApiNotFoundResponse({ description: "Broker not found" })
  async updateBroker(
    @User() user: UserPayloadEntity,
    @Body() broker: UpdateUserDto,
  ): Promise<AccountEntity> {
    const updatedBroker = await this.brokerService.updateBroker(
      user.sub,
      broker,
    );

    return updatedBroker;
  }

  @Delete()
  @Role(AccountRole.BROKER)
  @ApiOkResponse({ description: "Broker deleted" })
  @ApiBadRequestResponse({ description: "Invalid request body" })
  @ApiNotFoundResponse({ description: "Broker not found" })
  async deleteBroker(@User() user: UserPayloadEntity): Promise<void> {
    await this.brokerService.deleteBroker(user.sub);
  }
}
