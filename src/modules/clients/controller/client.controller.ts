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
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { AccountEntity } from "../../../common/entity/account.entity";
import { AccountRole } from "../../../common/enums/account-role.enum";
import { ParseIdPipe } from "../../../common/pipes/parse-id.pipe";
import { Role } from "../../../modules/auth/decorators/has-role.decorator";
import { AuthGuard } from "../../../modules/auth/guards/auth.guard";
import { RolesGuard } from "../../../modules/auth/guards/role.guard";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";
import { ClientServiceInterface } from "../services/client.service.interface";
import { ClientControllerInterface } from "./client.controller.interface";

@Controller("clients")
@ApiTags("clients")
@ApiBearerAuth()
@Role(AccountRole.BROKER)
@UseGuards(AuthGuard, RolesGuard)
export class ClientController implements ClientControllerInterface {
  constructor(private readonly clientService: ClientServiceInterface) {}

  @Get()
  @ApiResponse({ status: 200, description: "Clients found" })
  @ApiResponse({
    status: 401,
    description: "Missing or invalid authentication token",
  })
  @ApiResponse({
    status: 403,
    description: "Authentication token is not from a broker",
  })
  async findAll(
    @Query("page") page?: PaginationDto,
  ): Promise<Array<AccountEntity>> {
    return await this.clientService.findAll(page);
  }

  @Get(":clientId")
  @ApiResponse({ status: 200, description: "Client found" })
  @ApiResponse({
    status: 401,
    description: "Missing or invalid authentication token",
  })
  @ApiResponse({
    status: 403,
    description: "Authentication token is not from a broker",
  })
  async findById(
    @Param("clientId", ParseIdPipe) clientId: number,
  ): Promise<AccountEntity> {
    return await this.clientService.findById(clientId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: "Client created" })
  @ApiResponse({
    status: 401,
    description: "Missing or invalid authentication token",
  })
  @ApiResponse({
    status: 403,
    description: "Authentication token is not from a broker",
  })
  async create(@Body() requestBody: RequestUserDto): Promise<void> {
    await this.clientService.create(requestBody);
  }

  @Patch(":clientId")
  @ApiResponse({ status: 200, description: "Client updated" })
  @ApiResponse({
    status: 401,
    description: "Missing or invalid authentication token",
  })
  @ApiResponse({
    status: 403,
    description: "Authentication token is not from a broker",
  })
  async update(
    @Param("clientId", ParseIdPipe) clientId: number,
    @Body() requestBody: UpdateUserDto,
  ): Promise<AccountEntity> {
    return await this.clientService.update(clientId, requestBody);
  }

  @Delete(":clientId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: "Client deleted" })
  @ApiResponse({
    status: 401,
    description: "Missing or invalid authentication token",
  })
  @ApiResponse({
    status: 403,
    description: "Authentication token is not from a broker",
  })
  async delete(
    @Param("clientId", ParseIdPipe) clientId: number,
  ): Promise<void> {
    await this.clientService.delete(clientId);
  }
}
