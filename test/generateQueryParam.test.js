import { describe, it, expect } from "vitest";
import { generateQueryParam } from "../utils/generateQueryParam";

describe("generateQueryParam", () => {
  it("should generate proper query param", () => {
    expect(generateQueryParam([{ id: 1 }, { id: 2 }, { id: 3 }])).toBe(
      "id=1&id=2&id=3"
    );
  });
});
