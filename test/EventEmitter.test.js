import { describe, it, expect, vi } from "vitest";
import { EventEmitter } from "../utils/eventEmitter";

describe("eventEmitter", () => {
  const eventEmitter = new EventEmitter();

  it("should be able to add eventListener", () => {
    eventEmitter.on("changeModel", (model1) => {
      console.log(model1);
    });
    eventEmitter.on("changeModel", (model1) => {
      console.log(model1);
    });
    expect(eventEmitter.getListeners("changeModel").length).toBe(2);
  });

  it("should be able to emit event", () => {
    // vi: vitest에서 mocking 및 spying 기능을 제공하는 객체
    const listener = vi.fn((model1, model2) => {
      console.log(model1);
      console.log(model2);
    });
    eventEmitter.on("changeModel", listener); // 함수가 호출됐는지 안됐는지 확인

    const model1 = [1, 2, 3];
    const model2 = { name: "john", age: 27 };
    eventEmitter.emit("changeModel", model1, model2);

    expect(listener).toBeCalled(); // mocking 함수기 때문에 호출을 확인할 수 있는 것
  });

  it("should be able to emit event many times", () => {
    const listener = vi.fn((model1) => {
      console.log(model1);
    });

    eventEmitter.on("changeModel", listener);
    eventEmitter.emit("changeModel");
    eventEmitter.emit("changeModel");
    eventEmitter.emit("changeModel");
    expect(listener).toBeCalledTimes(3);
  });

  it("should be able to remove eventListener", () => {
    const getListenersLengthOrNull = (type) =>
      eventEmitter.getListeners(type)?.length || null; // 옵셔널 체이닝
    const listener = vi.fn((string) => {
      console.log(string + ": yes vi");
    });

    eventEmitter.on("changeString", (string) => {
      console.log(string + ": no vi");
    });
    eventEmitter.on("changeString", listener);
    eventEmitter.emit("changeString", "test 1");
    expect(getListenersLengthOrNull("changeString")).toBe(2);
    expect(listener).toBeCalled();

    eventEmitter.off("changeString", listener);
    eventEmitter.emit("changeString", "test 2");
    expect(getListenersLengthOrNull("changeString")).toBe(1);
    expect(listener).toBeCalledTimes(1);

    eventEmitter.off("changeString");
    expect(getListenersLengthOrNull("changeString")).toBe(null);
  });
});
