import { parseTokenDuration } from "./parse-jwt-duration";

describe("parseTokenDuration", () => {
  it("should parse 7d as 7", () => {
    process.env.JWT_DURATION = "7d";

    const duration = parseTokenDuration();

    expect(duration).toEqual(7);
  });

  it("should parse 30d as 30", () => {
    process.env.JWT_DURATION = "30d";

    const duration = parseTokenDuration();

    expect(duration).toEqual(30);
  });
});
