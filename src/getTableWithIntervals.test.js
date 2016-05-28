import expect from 'expect'
import expectElement from 'expect-element'
expect.extend(expectElement)

import jsdom from "mocha-jsdom";
import { getTableWithIntervalsAnd$ } from './getTableWithIntervals.js';
import intervals from "./intervals.mock.json";
var $ = require("jquery");

describe('getTableWithIntervals', function () {
  jsdom();
  it('should return a table', function () {
    $ = $(window);
    const actual = getTableWithIntervalsAnd$(intervals, $);
    expect(actual.tagName).toEqual("TABLE");
    expect(actual.innerHTML).toEqual('<tbody><tr><td><span class="days">mon - wed: </span></td><td><span class="numbers">11:00 - 20:30</span></td></tr><tr><td><span class="days">thu - fri: </span></td><td><span class="numbers">11:00 - 21:00</span></td></tr><tr><td><span class="days">sat: </span></td><td><span class="numbers">10:30 - 20:30</span></td></tr><tr><td><span class="days">sun: </span></td><td><span class="numbers">12:00 - 19:00</span></td></tr></tbody>');
  });
});
