import expect from "expect";
import { getIntervalsWithHours } from "../entry.js";
import { hoursRequester } from "./mocks/mocks.js";
import intervals from "./mocks/intervals.mock.json";
import hours from "./mocks/hours.mock.json";

describe("getIntervalWithHours", () => {
  it("it should return intervals using hours", () => {
    const expected = intervals;
    const actual = getIntervalsWithHours(hours);
    expect(actual).toEqual(expected);
  });
});
