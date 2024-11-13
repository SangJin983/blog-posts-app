import { describe, it, expect } from "vitest";
import { range } from "../utils/range";

describe("range", () => {
  it("should generate proper array", () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(5, 10)).toEqual([5, 6, 7, 8, 9]);
  });

  it("should generate proper array with step", () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
  });
});
