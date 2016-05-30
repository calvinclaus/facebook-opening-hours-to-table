import expect from 'expect'
import expectElement from 'expect-element'
expect.extend(expectElement)
import jsdom from "mocha-jsdom";

import { getTableWithHours } from '../entry.js';

import hours from "./mocks/hours.mock.json";
  

describe("getTableWithHours", () => {
  jsdom();
  it('should return a table', function () {
    const actual = getTableWithHours(hours);
    expect(actual.tagName).toEqual("TABLE");
    expect(actual.innerHTML).toEqual('<tbody><tr><td><span class="days">mon - wed: </span></td><td><span class="numbers">11:00 - 20:30</span></td></tr><tr><td><span class="days">thu - fri: </span></td><td><span class="numbers">11:00 - 21:00</span></td></tr><tr><td><span class="days">sat: </span></td><td><span class="numbers">10:30 - 20:30</span></td></tr><tr><td><span class="days">sun: </span></td><td><span class="numbers">12:00 - 19:00</span></td></tr></tbody>');
  });

  it('should return a translated table', function () {
    const translationDict =  {mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So"}
    const actual = getTableWithHours(hours, translationDict);
    expect(actual.tagName).toEqual("TABLE");
    expect(actual.innerHTML).toEqual('<tbody><tr><td><span class="days">Mo - Mi: </span></td><td><span class="numbers">11:00 - 20:30</span></td></tr><tr><td><span class="days">Do - Fr: </span></td><td><span class="numbers">11:00 - 21:00</span></td></tr><tr><td><span class="days">Sa: </span></td><td><span class="numbers">10:30 - 20:30</span></td></tr><tr><td><span class="days">So: </span></td><td><span class="numbers">12:00 - 19:00</span></td></tr></tbody>');
  });

});

