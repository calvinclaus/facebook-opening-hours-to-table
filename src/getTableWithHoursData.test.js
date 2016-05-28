import expect from 'expect'
import expectElement from 'expect-element'
expect.extend(expectElement)

import jsdom from "mocha-jsdom";

import { getTableWithHoursData } from './entry.js';

import hours from "./hours.mock.json";
  

describe("getTableWithHoursData", () => {
  it("the method should exist", () => {
    expect(getTableWithHoursData).toBeA('function');
  });
});
