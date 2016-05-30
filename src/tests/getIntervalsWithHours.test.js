import expect from "expect";
import { getIntervalsWithHours } from "../entry.js";
import { hoursRequester } from "./mocks/mocks.js";

//Mock Data
import hours from "./mocks/hours.mock.json";
import intervals from "./mocks/intervals.mock.json";
import intervalsGer from "./mocks/intervalsGerman.mock.json";

describe("getIntervalsWithHours", () => {
  it("should return intervals using hours", () => {
    const expected = intervals;
    const actual = getIntervalsWithHours(hours);
    expect(actual).toEqual(expected);
  });

  it("should translate correctly", () => {
    const expected = intervalsGer;
    const translationDict =  {mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So"}
    const actual = getIntervalsWithHours(hours, translationDict);
    expect(actual).toEqual(expected);
  });
});
