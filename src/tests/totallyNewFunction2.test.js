import expect from "expect";
import { totalyNewFunction2 } from "../entry.js";

describe("totalyNewFunction2", () => {
  it("should return 1", () => {
    const expected = 1;
    const actual = totalyNewFunction2();
    expect(actual).toEqual(expected);
  });
});
