import { describe, it, expect } from "vitest";
import { timeout } from "../utils/timeout";

describe("time out", () => {
  it("should resolve if the promise resolves quickly", async () => {
    const quickPromise = new Promise((resolve) =>
      setTimeout(() => resolve("Success"), 50)
    );
    const result = await timeout(quickPromise, 100);
    expect(result).toBe("Success");
  });

  it("should reject if the pomise takes too long", async () => {
    const slowPromise = new Promise((resolve) =>
      setTimeout(() => resolve("Success"), 150)
    );

    await expect(timeout(slowPromise, 100)).rejects.toEqual({
      reason: "it's too late!",
    });
  });
});
