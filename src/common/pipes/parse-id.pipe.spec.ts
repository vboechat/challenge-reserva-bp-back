import { BadRequestException } from "@nestjs/common";

import { ParseIdPipe } from "./parse-id.pipe";

describe("ParseIdPipe", () => {
  it("should be defined", () => {
    expect(new ParseIdPipe()).toBeDefined();
  });

  it("should return bad request if id is invalid", () => {
    expect(() => new ParseIdPipe().transform(Number("test"))).toThrow(
      BadRequestException,
    );
  });
});
