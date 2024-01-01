import { BadRequestException } from "@nestjs/common";

import checkDuration from "./check-duration";

describe("checkDuration", () => {
  it("should throw an error if the duration is less than 30 minutes", () => {
    const fromDate = new Date();
    const toDate = new Date(fromDate.getTime() + 29 * 60 * 1000); // 29 minutes later

    expect(() => checkDuration(fromDate, toDate)).toThrow(BadRequestException);
    expect(() => checkDuration(fromDate, toDate)).toThrow(
      "Schedule duration must be at least 30 minutes",
    );
  });

  it("should throw an error if the duration is more than 2 hours", () => {
    const fromDate = new Date();
    const toDate = new Date(fromDate.getTime() + 121 * 60 * 1000); // 121 minutes later

    expect(() => checkDuration(fromDate, toDate)).toThrow(BadRequestException);
    expect(() => checkDuration(fromDate, toDate)).toThrow(
      "Schedule duration must be less than 2 hours",
    );
  });

  it("should not throw an error if the duration is between 30 minutes and 2 hours", () => {
    const fromDate = new Date();
    const toDate = new Date(fromDate.getTime() + 60 * 60 * 1000); // 60 minutes later

    expect(() => checkDuration(fromDate, toDate)).not.toThrow();

    const fromDate2 = new Date();
    const toDate2 = new Date(fromDate2.getTime() + 81 * 60 * 1000); // 81 minutes later

    expect(() => checkDuration(fromDate2, toDate2)).not.toThrow();
  });
});
