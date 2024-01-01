import { getPagination } from "./get-pagination";

describe("GetPagination", () => {
  let prismaServiceMock;

  beforeEach(() => {
    prismaServiceMock = {
      accounts: {
        count: jest.fn().mockResolvedValue(45),
      },
    };
  });

  it("should return pagination object with correct values when 0", async () => {
    const callGetPagination = await getPagination(prismaServiceMock, 0);

    expect(callGetPagination).toEqual({
      skip: 0,
      take: 45,
    });
  });

  it("should return pagination object with correct values", async () => {
    const callGetPagination = await getPagination(prismaServiceMock, 20);

    expect(callGetPagination).toEqual({
      skip: 0,
      take: 20,
    });
  });

  it("should return pagination object with correct values when 40", async () => {
    const callGetPagination = await getPagination(prismaServiceMock, 40);

    expect(callGetPagination).toEqual({
      skip: 40,
      take: 20,
    });
  });
});
