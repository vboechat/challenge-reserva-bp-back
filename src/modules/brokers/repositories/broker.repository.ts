import { Injectable } from "@nestjs/common";

import { AccountEntity } from "../../../common/entity/account.entity";
import { PrismaService } from "../../../common/services/prisma.service";
import { getPagination } from "../../../common/utils/get-pagination";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";
import { BrokerRepositoryInterface } from "./broker.repository.interface";

@Injectable()
export class BrokerRepository implements BrokerRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async getBrokers(page?: number): Promise<AccountEntity[]> {
    const { skip, take } = await getPagination(this.prismaService, page);

    const brokers = await this.prismaService.accounts.findMany({
      where: {
        role: "BROKER",
      },
      skip,
      take,
    });

    return brokers;
  }

  async getBrokerById(id: number): Promise<AccountEntity> {
    const broker = await this.prismaService.accounts.findUnique({
      where: {
        id,
        role: "BROKER",
      },
    });

    return broker;
  }

  async updateBroker(
    id: number,
    broker: UpdateUserDto,
  ): Promise<AccountEntity> {
    const updatedBroker = this.prismaService.accounts.update({
      where: {
        id,
        role: "BROKER",
      },
      data: {
        ...broker,
      },
    });

    return updatedBroker;
  }

  async deleteBroker(id: number): Promise<void> {
    await this.prismaService.accounts.delete({
      where: {
        id,
        role: "BROKER",
      },
    });
  }
}
