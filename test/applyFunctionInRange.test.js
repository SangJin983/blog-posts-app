import { it, expect, vi } from "vitest";
import { applyFunctionInRange } from "../utils/applyFunctionInRange";

it("should apply the function to each number in the given range", () => {
  const array = [];
  const mockFn = vi.fn((number) => {
    array.push(number);
  });
  applyFunctionInRange(3, 5, mockFn);

  expect(mockFn).toBeCalledTimes(3);
  expect(array).toEqual([3, 4, 5]);
});
