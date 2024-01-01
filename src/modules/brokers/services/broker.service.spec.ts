import { NotFoundException } from "@nestjs/common";

import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { AccountEntity } from "../../../common/entity/account.entity";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UserServiceInterface } from "../../../modules/user/services/user.service.interface";
import { BrokerRepositoryInterface } from "../repositories/broker.repository.interface";
import { BrokerService } from "./broker.service";

describe("BrokerService", () => {
  let brokerService: BrokerService;
  let userService: jest.Mocked<UserServiceInterface>;
  let brokerRepository: jest.Mocked<BrokerRepositoryInterface>;

  beforeEach(() => {
    brokerRepository = {
      getBrokers: jest.fn(),
      getBrokerById: jest.fn(),
      updateBroker: jest.fn(),
      deleteBroker: jest.fn(),
    };
    userService = {
      create: jest.fn(),
      findOne: jest.fn(),
      hashPassword: jest.fn(),
    };

    brokerService = new BrokerService(brokerRepository, userService);
  });

  const mockBrokers: AccountEntity[] = [
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

  it("should create a broker", async () => {
    const brokerData: RequestUserDto = {
      username: "broker1",
      email: "broker1@email.com",
      password: "password",
    };

    await brokerService.createBroker(brokerData);

    expect(userService.create).toHaveBeenCalledWith(brokerData, "BROKER");
  });

  it("should get brokers", async () => {
    brokerRepository.getBrokers.mockResolvedValue(mockBrokers);

    const brokers = await brokerService.getBrokers(mockPagination);

    expect(brokerRepository.getBrokers).toHaveBeenCalled();
    expect(brokers).toEqual(mockBrokers);
  });

  it("should not get brokers after page 2", async () => {
    brokerRepository.getBrokers.mockResolvedValue([]);
    mockPagination.page = 2;

    const brokers = await brokerService.getBrokers(mockPagination);

    expect(brokerRepository.getBrokers).toHaveBeenCalled();
    expect(brokers).toEqual([]);
  });

  it("should get a broker by id", async () => {
    brokerRepository.getBrokerById.mockResolvedValue(mockBrokers[0]);

    const broker = await brokerService.getBrokerById(1);

    expect(brokerRepository.getBrokerById).toHaveBeenCalledWith(1);
    expect(broker).toEqual(mockBrokers[0]);
  });

  it("should not get a broker by id", async () => {
    brokerRepository.getBrokerById.mockResolvedValue(undefined);

    try {
      await brokerService.getBrokerById(1);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it("should update a broker", async () => {
    const brokerData: RequestUserDto = {
      username: "broker1",
      email: "broker1@new-email.com",
      password: "password",
    };

    brokerRepository.getBrokerById.mockResolvedValue(mockBrokers[0]);
    brokerRepository.updateBroker.mockResolvedValue(mockBrokers[0]);

    const broker = await brokerService.updateBroker(1, brokerData);

    expect(brokerRepository.updateBroker).toHaveBeenCalledWith(1, brokerData);
    expect(broker).toEqual(mockBrokers[0]);
  });

  it("should not update a broker", async () => {
    const brokerData: RequestUserDto = {
      username: "broker1",
      email: "broker1@new-email.com",
      password: "password",
    };

    brokerRepository.getBrokerById.mockResolvedValue(undefined);

    try {
      await brokerService.updateBroker(1, brokerData);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it("should delete a broker", async () => {
    brokerRepository.getBrokerById.mockResolvedValue(mockBrokers[0]);

    await brokerService.deleteBroker(1);

    expect(brokerRepository.deleteBroker).toHaveBeenCalledWith(1);
  });

  it("should not delete a broker", async () => {
    brokerRepository.getBrokerById.mockResolvedValue(undefined);

    try {
      await brokerService.deleteBroker(1);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
