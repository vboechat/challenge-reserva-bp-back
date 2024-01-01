import { UserPayloadEntity } from "../../../modules/auth/types/payload.type";
import { BrokerServiceInterface } from "../../../modules/brokers/services/broker.service.interface";
import { ScheduleEntity } from "../entities/schedule.entity";
import { SchedulesRepositoryInterface } from "../repository/schedules.repository.interface";
import { SchedulesService } from "./schedules.service";

describe("SchedulesService", () => {
  let schedulesService: SchedulesService;
  let brokerService: jest.Mocked<BrokerServiceInterface>;
  let schedulesRepository: jest.Mocked<SchedulesRepositoryInterface>;

  beforeEach(() => {
    schedulesRepository = {
      createSchedule: jest.fn(),
      getSchedules: jest.fn(),
      isBrokerBusy: jest.fn(),
    };
    brokerService = {
      createBroker: jest.fn(),
      getBrokerById: jest.fn(),
      getBrokers: jest.fn(),
      updateBroker: jest.fn(),
      deleteBroker: jest.fn(),
    };

    schedulesService = new SchedulesService(brokerService, schedulesRepository);
  });

  const userPayloadEntity: UserPayloadEntity = {
    sub: 2,
    username: "test",
    email: "test@gmail.com",
    role: ["CLIENT"],
  };

  const toDate = new Date();
  toDate.setMinutes(toDate.getMinutes() + 40);

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

  describe("createSchedule", () => {
    it("should create a schedule", async () => {
      schedulesRepository.createSchedule.mockResolvedValueOnce(
        mockSchedules[0],
      );
      brokerService.getBrokerById.mockResolvedValueOnce({
        id: 1,
        username: "broker",
        email: "broker@email.com",
        role: "BROKER",
        password: "123",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await schedulesService.createSchedule(userPayloadEntity, {
        fromDate: new Date(),
        toDate: toDate,
        brokerId: 1,
      });

      expect(result).toEqual(mockSchedules[0]);
      expect(result.broker.password).toBeUndefined();
      expect(result.client.password).toBeUndefined();
    });

    it("should throw an error if the duration is less than 30 minutes", async () => {
      await expect(
        schedulesService.createSchedule(userPayloadEntity, {
          fromDate: new Date(),
          toDate: new Date(),
          brokerId: 1,
        }),
      ).rejects.toThrow();
    });

    it("should throw an error if the duration is more than 2 hours", async () => {
      const toDate = new Date();
      toDate.setHours(toDate.getHours() + 3);

      await expect(
        schedulesService.createSchedule(userPayloadEntity, {
          fromDate: new Date(),
          toDate: toDate,
          brokerId: 1,
        }),
      ).rejects.toThrow();
    });

    it("should throw an error if the broker is busy", async () => {
      schedulesRepository.isBrokerBusy.mockResolvedValueOnce(true);

      await expect(
        schedulesService.createSchedule(userPayloadEntity, {
          fromDate: new Date(),
          toDate: toDate,
          brokerId: 1,
        }),
      ).rejects.toThrow();
    });

    it("should throw an error if the broker is not found", async () => {
      brokerService.getBrokerById.mockResolvedValueOnce(null);

      await expect(
        schedulesService.createSchedule(userPayloadEntity, {
          fromDate: new Date(),
          toDate: toDate,
          brokerId: 1,
        }),
      ).rejects.toThrow();
    });
  });

  describe("getSchedules", () => {
    it("should return schedules for the client", async () => {
      schedulesRepository.getSchedules.mockResolvedValue([mockSchedules[0]]);

      const result = await schedulesService.getSchedules(userPayloadEntity);

      expect(result).toEqual([mockSchedules[0]]);
    });

    it("should return schedules without broker and client password", async () => {
      schedulesRepository.getSchedules.mockResolvedValue([mockSchedules[0]]);

      const result = await schedulesService.getSchedules(userPayloadEntity);

      expect(result[0].client.password).toBeUndefined();
      expect(result[0].broker.password).toBeUndefined();
    });

    it("should return schedules for the broker", async () => {
      schedulesRepository.getSchedules.mockResolvedValue(mockSchedules);

      userPayloadEntity.role = ["BROKER"];

      const result = await schedulesService.getSchedules(userPayloadEntity);

      expect(result).toEqual(mockSchedules);
    });
  });
});
