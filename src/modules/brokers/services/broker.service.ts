import { Injectable, NotFoundException } from "@nestjs/common";

import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { AccountEntity } from "../../../common/entity/account.entity";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";
import { UserServiceInterface } from "../../../modules/user/services/user.service.interface";
import { BrokerRepositoryInterface } from "../repositories/broker.repository.interface";
import { BrokerServiceInterface } from "./broker.service.interface";

@Injectable()
export class BrokerService implements BrokerServiceInterface {
  constructor(
    private readonly brokerRepository: BrokerRepositoryInterface,
    private readonly usersService: UserServiceInterface,
  ) {}

  async createBroker(broker: RequestUserDto): Promise<void> {
    await this.usersService.create(broker, "BROKER");
  }

  async getBrokers(page?: PaginationDto) {
    const pageNumber = Number(page);
    const actualPage = pageNumber ? pageNumber * 20 : 0;

    const brokers = await this.brokerRepository.getBrokers(actualPage);

    brokers.forEach((broker) => {
      delete broker.password;
    });

    return brokers;
  }

  async getBrokerById(id: number) {
    const broker = await this.brokerRepository.getBrokerById(id);

    if (!broker) {
      throw new NotFoundException("Broker not found");
    }

    delete broker.password;

    return broker;
  }

  async updateBroker(
    id: number,
    broker: UpdateUserDto,
  ): Promise<AccountEntity> {
    const brokerExists = await this.brokerRepository.getBrokerById(id);

    if (!brokerExists) {
      throw new NotFoundException("Broker not found");
    }

    const hashedPassword = await this.usersService.hashPassword(
      broker.password,
    );
    broker.password = hashedPassword;

    const updatedBroker = await this.brokerRepository.updateBroker(id, broker);
    delete updatedBroker.password;

    return updatedBroker;
  }

  async deleteBroker(id: number): Promise<void> {
    const brokerExists = await this.brokerRepository.getBrokerById(id);

    if (!brokerExists) {
      throw new NotFoundException("Broker not found");
    }

    await this.brokerRepository.deleteBroker(id);
  }
}
