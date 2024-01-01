import { NotFoundException } from "@nestjs/common";

import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { AccountEntity } from "../../../common/entity/account.entity";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UserServiceInterface } from "../../../modules/user/services/user.service.interface";
import { ClientRepositoryInterface } from "../repositories/client.repository.interface";
import { ClientService } from "./client.service";

describe("ClientService", () => {
  let clientService: ClientService;
  let userService: jest.Mocked<UserServiceInterface>;
  let clientRepository: jest.Mocked<ClientRepositoryInterface>;

  beforeEach(() => {
    clientRepository = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };
    userService = {
      create: jest.fn(),
      findOne: jest.fn(),
      hashPassword: jest.fn(),
    };

    clientService = new ClientService(clientRepository, userService);
  });

  const mockClients: AccountEntity[] = [
    {
      id: 1,
      username: "broker1",
      email: "broker1@email.com",
      password: "broker1",
      role: "BROKER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      username: "broker2",
      email: "broker2@email.com",
      password: "broker2",
      role: "BROKER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockPagination: PaginationDto = { page: 1 };

  it("should create a client", async () => {
    const clientData: RequestUserDto = {
      username: "client1",
      email: "client1@email.com",
      password: "password",
    };

    await clientService.create(clientData);

    expect(userService.create).toHaveBeenCalledWith(clientData, "CLIENT");
  });

  it("should get clients", async () => {
    clientRepository.findAll.mockResolvedValue(mockClients);

    const clients = await clientService.findAll(mockPagination);

    expect(clientRepository.findAll).toHaveBeenCalled();
    expect(clients).toEqual(mockClients);
  });

  it("should not get clients after page 2", async () => {
    clientRepository.findAll.mockResolvedValue([]);
    mockPagination.page = 2;

    const clients = await clientService.findAll(mockPagination);

    expect(clientRepository.findAll).toHaveBeenCalled();
    expect(clients).toEqual([]);
  });

  it("should get a client by id", async () => {
    clientRepository.findById.mockResolvedValue(mockClients[0]);

    const client = await clientService.findById(1);

    expect(clientRepository.findById).toHaveBeenCalledWith(1);
    expect(client).toEqual(mockClients[0]);
  });

  it("should not get a client by id", async () => {
    clientRepository.findById.mockResolvedValue(undefined);

    try {
      await clientService.findById(1);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it("should update a client", async () => {
    const clientData: RequestUserDto = {
      username: "client1",
      email: "client1@new-email.com",
      password: "password",
    };

    clientRepository.findById.mockResolvedValue(mockClients[0]);
    clientRepository.update.mockResolvedValue(mockClients[0]);

    const client = await clientService.update(1, clientData);

    expect(clientRepository.update).toHaveBeenCalledWith(1, clientData);
    expect(client).toEqual(mockClients[0]);
  });

  it("should not update a client", async () => {
    const clientData: RequestUserDto = {
      username: "client1",
      email: "client1@new-email.com",
      password: "password",
    };

    clientRepository.findById.mockResolvedValue(undefined);

    try {
      await clientService.update(1, clientData);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it("should delete a broker", async () => {
    clientRepository.findById.mockResolvedValue(mockClients[0]);

    await clientService.delete(1);

    expect(clientRepository.delete).toHaveBeenCalledWith(1);
  });

  it("should not delete a broker", async () => {
    clientRepository.findById.mockResolvedValue(undefined);

    try {
      await clientService.delete(1);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
