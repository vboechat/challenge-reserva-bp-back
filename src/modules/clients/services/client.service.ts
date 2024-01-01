import { Injectable, NotFoundException } from "@nestjs/common";

import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { AccountEntity } from "../../../common/entity/account.entity";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";
import { UserServiceInterface } from "../../../modules/user/services/user.service.interface";
import { ClientRepositoryInterface } from "../repositories/client.repository.interface";
import { ClientServiceInterface } from "./client.service.interface";

@Injectable()
export class ClientService implements ClientServiceInterface {
  constructor(
    private readonly clientRepository: ClientRepositoryInterface,
    private readonly usersService: UserServiceInterface,
  ) {}

  async create(requestBody: RequestUserDto): Promise<void> {
    await this.usersService.create(requestBody, "CLIENT");
  }

  async findAll(page?: PaginationDto): Promise<AccountEntity[]> {
    const pageNumber = Number(page);
    const actualPage = pageNumber ? pageNumber * 20 : 0;

    const clients = await this.clientRepository.findAll(actualPage);

    clients.forEach((broker) => {
      delete broker.password;
    });

    return clients;
  }

  async findById(clientId: number): Promise<AccountEntity> {
    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      throw new NotFoundException("Client not found");
    }

    delete client.password;

    return client;
  }

  async update(
    clientId: number,
    requestBody: UpdateUserDto,
  ): Promise<AccountEntity> {
    const clientExists = await this.clientRepository.findById(clientId);

    if (!clientExists) {
      throw new NotFoundException("Broker not found");
    }

    const hashedPassword = await this.usersService.hashPassword(
      requestBody.password,
    );
    requestBody.password = hashedPassword;

    const updatedClient = await this.clientRepository.update(
      clientId,
      requestBody,
    );
    delete updatedClient.password;

    return updatedClient;
  }

  async delete(clientId: number): Promise<void> {
    const clientExists = await this.clientRepository.findById(clientId);

    if (!clientExists) {
      throw new NotFoundException("Broker not found");
    }

    await this.clientRepository.delete(clientId);
  }
}
