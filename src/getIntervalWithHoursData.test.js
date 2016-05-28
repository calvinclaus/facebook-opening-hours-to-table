import expect from "expect";
import { getIntervalWithHoursData } from "./entry.js";
import { hoursRequester } from "./mocks.js";
import intervals from "./intervals.mock.json";
import hours from "./hours.mock.json";

describe("getIntervalWithHoursData", () => {
  it("it should return intervals using hours", () => {
    const expected = intervals;
    const actual = getIntervalWithHoursData(hours);
    expect(actual).toEqual(expected);
  });
});
