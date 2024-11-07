import { it, expect, describe } from "vitest";
import { deepClone } from "../utils/deepClone";

describe("deepClone test", () => {
  it("should clone primitive type", () => {
    expect(deepClone("jake")).toBe("jake");
    expect(deepClone(33)).toBe(33);
    expect(deepClone(true)).toBe(true);
    expect(deepClone()).toBe(null);
  });

  it("should clone array type", () => {
    const arr1 = [1, 2, 3, 4, 5];
    const clonedArr1 = deepClone(arr1);
    expect(arr1).toEqual(clonedArr1);
    arr1[0] = 2;
    expect(arr1).not.toEqual(clonedArr1);

    const arr2 = [[1], 2, 3, 4, 5];
    const clonedArr2 = deepClone(arr2);
    console.log(clonedArr2);
    expect(arr2).toEqual(clonedArr2);
    arr2[0] = 2;
    expect(arr2).not.toEqual(clonedArr2);
  });

  it("should clone object type", () => {
    const obj1 = { name: "jake", age: 3 };
    const clonedObj1 = deepClone(obj1);
    expect(obj1).toEqual(clonedObj1);
    obj1.name = "han";
    expect(obj1).not.toEqual(clonedObj1);

    const obj2 = { name: "jake", age: 30, children: [{ name: "roy", age: 3 }] };
    const clonedObj2 = deepClone(obj2);
    expect(obj2).toEqual(clonedObj2);
    obj2.children[0].name = "mike";
    expect(obj2).not.toEqual(clonedObj2);
  });
});
