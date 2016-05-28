import expect from "expect";
import { getIntervalWithTokenAndHoursRequester } from "./entry.js";
import { hoursRequester } from "./mocks.js";
import intervals from "./intervals.mock.json";

describe("getIntervalWithToken", () => {
  it("it should return intervals using token", () => {
    const token = 123;
    const expected = intervals;
    getIntervalWithTokenAndHoursRequester(token, "", (actual) => {
      expect(actual).toEqual(expected);
    }, undefined, hoursRequester);
  });
});
