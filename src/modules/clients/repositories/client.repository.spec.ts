import { TestBed } from "@automock/jest";

import { AccountEntity } from "../../../common/entity/account.entity";
import { PrismaService } from "../../../common/services/prisma.service";
import { ClientRepository } from "./client.repository";

describe("ClientRepository", () => {
  let clientRepository: ClientRepository;
  let database: jest.Mocked<PrismaService>;

  const mockClients: AccountEntity[] = [
    {
      id: 1,
      username: "client1",
      email: "client1@email.com",
      password: "client1",
      role: "CLIENT",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      username: "client2",
      email: "client2@email.com",
      password: "client2",
      role: "CLIENT",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ClientRepository).compile();

    clientRepository = unit;
    database = unitRef.get(PrismaService);
  });

  it("should find all clients", async () => {
    database.accounts.count = jest.fn().mockResolvedValueOnce(2);
    database.accounts.findMany = jest.fn().mockResolvedValueOnce(mockClients);

    const clients = await clientRepository.findAll(1);

    expect(database.accounts.findMany).toHaveBeenCalled();
    expect(clients).toEqual(mockClients);
  });

  it("should not find clients after page 2", async () => {
    database.accounts.count = jest.fn().mockResolvedValueOnce(2);
    database.accounts.findMany = jest.fn().mockResolvedValueOnce([]);

    const client = await clientRepository.findAll(2);

    expect(database.accounts.findMany).toHaveBeenCalled();
    expect(client).toEqual([]);
  });

  it("should find a client by id", async () => {
    database.accounts.findUnique = jest
      .fn()
      .mockResolvedValueOnce(mockClients[0]);

    const client = await clientRepository.findById(1);

    expect(database.accounts.findUnique).toHaveBeenCalled();
    expect(client).toEqual(mockClients[0]);
  });

  it("should update a client", async () => {
    database.accounts.update = jest.fn().mockResolvedValueOnce(mockClients[0]);

    const client = await clientRepository.update(1, {
      username: "client1",
      email: "client@newemail.com",
      password: "client1",
    });

    expect(database.accounts.update).toHaveBeenCalled();
    expect(client).toEqual(mockClients[0]);
  });

  it("should delete a client", async () => {
    database.accounts.delete = jest.fn();

    await clientRepository.delete(1);

    expect(database.accounts.delete).toHaveBeenCalled();
  });
});
