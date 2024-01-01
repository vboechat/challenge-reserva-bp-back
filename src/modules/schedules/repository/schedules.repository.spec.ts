import { TestBed } from "@automock/jest";

import { PrismaService } from "../../../common/services/prisma.service";
import { ScheduleEntity } from "../entities/schedule.entity";
import { SchedulesRepository } from "./schedules.repository";

describe("SchedulesRepository", () => {
  let schedulesRepository: SchedulesRepository;
  let database: jest.Mocked<PrismaService>;

  const mockSchedules: ScheduleEntity[] = [
    {
      id: 1,
      fromDate: new Date(),
      toDate: new Date(),
      brokerId: 1,
      broker: {
        id: 1,
        username: "Test Broker",
        email: "broker@email.com",
        password: "123456",
        role: "BROKER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      clientId: 2,
      client: {
        id: 2,
        username: "Test Client",
        email: "client@email.com",
        password: "123456",
        role: "CLIENT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      fromDate: new Date(),
      toDate: new Date(),
      brokerId: 1,
      broker: {
        id: 1,
        username: "Test Broker",
        email: "broker@email.com",
        password: "123456",
        role: "BROKER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      clientId: 3,
      client: {
        id: 3,
        username: "Test Client",
        email: "client@email.com",
        password: "123456",
        role: "CLIENT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(SchedulesRepository).compile();

    schedulesRepository = unit;
    database = unitRef.get(PrismaService);
  });

  it("should create a schedule in the database", async () => {
    database.schedules.create = jest.fn().mockResolvedValue(mockSchedules[0]);

    const schedule = await schedulesRepository.createSchedule(
      {
        fromDate: new Date(),
        toDate: new Date(),
        brokerId: 1,
      },
      2,
    );

    expect(database.schedules.create).toHaveBeenCalled();
    expect(schedule).toEqual(mockSchedules[0]);
    expect(schedule.brokerId).toEqual(1);
    expect(schedule.clientId).toEqual(2);
  });

  it("should a client retrieve schedules from the database", async () => {
    database.schedules.findMany = jest.fn().mockResolvedValue(mockSchedules[0]);

    const schedules = await schedulesRepository.getSchedules(2, "CLIENT");

    expect(database.schedules.findMany).toHaveBeenCalled();
    expect(schedules).toEqual(mockSchedules[0]);
  });

  it("should a broker retrieve schedules from the database", async () => {
    database.schedules.findMany = jest.fn().mockResolvedValue(mockSchedules);

    const schedules = await schedulesRepository.getSchedules(1, "BROKER");

    expect(database.schedules.findMany).toHaveBeenCalled();
    expect(schedules).toEqual(mockSchedules);
  });

  it("should return true if broker is busy", async () => {
    database.schedules.findFirst = jest
      .fn()
      .mockResolvedValue(mockSchedules[0]);

    const isBusy = await schedulesRepository.isBrokerBusy({
      fromDate: new Date(),
      toDate: new Date(),
      brokerId: 1,
    });

    expect(database.schedules.findFirst).toHaveBeenCalled();
    expect(isBusy).toEqual(true);
  });

  it("should return false if broker is not busy", async () => {
    database.schedules.findFirst = jest.fn().mockResolvedValue(null);

    const isBusy = await schedulesRepository.isBrokerBusy({
      fromDate: new Date(),
      toDate: new Date(),
      brokerId: 1,
    });

    expect(database.schedules.findFirst).toHaveBeenCalled();
    expect(isBusy).toEqual(false);
  });
});
