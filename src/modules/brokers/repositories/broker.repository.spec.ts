import { TestBed } from "@automock/jest";

import { AccountEntity } from "../../../common/entity/account.entity";
import { PrismaService } from "../../../common/services/prisma.service";
import { BrokerRepository } from "./broker.repository";

describe("BrokerRepository", () => {
  let brokerRepository: BrokerRepository;
  let database: jest.Mocked<PrismaService>;

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

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(BrokerRepository).compile();

    brokerRepository = unit;
    database = unitRef.get(PrismaService);
  });

  it("should find all brokers", async () => {
    database.accounts.count = jest.fn().mockResolvedValueOnce(2);
    database.accounts.findMany = jest.fn().mockResolvedValueOnce(mockBrokers);

    const brokers = await brokerRepository.getBrokers(1);

    expect(database.accounts.findMany).toHaveBeenCalled();
    expect(brokers).toEqual(mockBrokers);
  });

  it("should not find brokers after page 2", async () => {
    database.accounts.count = jest.fn().mockResolvedValueOnce(2);
    database.accounts.findMany = jest.fn().mockResolvedValueOnce([]);

    const brokers = await brokerRepository.getBrokers(2);

    expect(database.accounts.findMany).toHaveBeenCalled();
    expect(brokers).toEqual([]);
  });

  it("should find a broker by id", async () => {
    database.accounts.findUnique = jest
      .fn()
      .mockResolvedValueOnce(mockBrokers[0]);

    const broker = await brokerRepository.getBrokerById(1);

    expect(database.accounts.findUnique).toHaveBeenCalled();
    expect(broker).toEqual(mockBrokers[0]);
  });

  it("should update a broker", async () => {
    database.accounts.update = jest.fn().mockResolvedValueOnce(mockBrokers[0]);

    const broker = await brokerRepository.updateBroker(1, {
      username: "broker1",
      email: "broker1@newemail.com",
      password: "broker1",
    });

    expect(database.accounts.update).toHaveBeenCalled();
    expect(broker).toEqual(mockBrokers[0]);
  });

  it("should delete a broker", async () => {
    database.accounts.delete = jest.fn();

    await brokerRepository.deleteBroker(1);

    expect(database.accounts.delete).toHaveBeenCalled();
  });
});
