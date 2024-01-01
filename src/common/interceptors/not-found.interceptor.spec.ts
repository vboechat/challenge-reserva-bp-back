import { ExecutionContext, NotFoundException } from "@nestjs/common";
import { CallHandler } from "@nestjs/common/interfaces";
import { of } from "rxjs";
import { tap } from "rxjs/operators";

import { NotFoundInterceptor } from "./not-found.interceptor";

describe("NotFoundInterceptor", () => {
  let interceptor: NotFoundInterceptor;
  let context: ExecutionContext;

  beforeEach(() => {
    interceptor = new NotFoundInterceptor();
    context = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({})),
      })),
    } as unknown as ExecutionContext;
  });

  it("should throw a NotFoundException if data is null", async () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of(null)),
    } as CallHandler;

    try {
      await interceptor.intercept(context, callHandler);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it("should throw a NotFoundException if data length is 0", async () => {
    const context: ExecutionContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({})),
      })),
    } as unknown as ExecutionContext;
    const callHandler: CallHandler = {
      handle: jest.fn(() => of([])),
    } as CallHandler;

    try {
      await interceptor.intercept(context, callHandler);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it("should return data if data is not null and data length is greater than 0", async () => {
    const data = ["data"];
    const callHandler: CallHandler = {
      handle: jest.fn(() => of(data)),
    } as CallHandler;

    await interceptor.intercept(context, callHandler).pipe(
      tap((data) => {
        expect(data).toEqual(["data"]);
      }),
    );
  });
});
