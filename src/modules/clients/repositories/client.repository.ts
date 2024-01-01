import { Injectable } from "@nestjs/common";

import { AccountEntity } from "../../../common/entity/account.entity";
import { PrismaService } from "../../../common/services/prisma.service";
import { getPagination } from "../../../common/utils/get-pagination";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";
import { ClientRepositoryInterface } from "./client.repository.interface";

@Injectable()
export class ClientRepository implements ClientRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(page?: number): Promise<AccountEntity[]> {
    const { skip, take } = await getPagination(this.prismaService, page);

    const clients = await this.prismaService.accounts.findMany({
      where: {
        role: "CLIENT",
      },
      skip,
      take,
    });

    return clients;
  }

  async findById(clientId: number): Promise<AccountEntity> {
    const client = await this.prismaService.accounts.findUnique({
      where: {
        id: clientId,
        role: "CLIENT",
      },
    });

    return client;
  }

  async create(requestBody: RequestUserDto): Promise<AccountEntity> {
    const createdClient = await this.prismaService.accounts.create({
      data: {
        ...requestBody,
        role: "CLIENT",
      },
    });

    return createdClient;
  }

  async update(
    clientId: number,
    requestBody: UpdateUserDto,
  ): Promise<AccountEntity> {
    const updatedClient = this.prismaService.accounts.update({
      where: {
        id: clientId,
        role: "CLIENT",
      },
      data: {
        ...requestBody,
      },
    });

    return updatedClient;
  }

  async delete(clientId: number): Promise<void> {
    await this.prismaService.accounts.delete({
      where: {
        id: clientId,
        role: "CLIENT",
      },
    });
  }
}
