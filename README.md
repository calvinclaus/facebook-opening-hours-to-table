# faceboook-opening-hours-to-table
Fetches opening hour data from Facebook, and returns an html table with the opening hours such that days with equal opening hours are on one table row.

## Installation

This package is distributed via npm:

```
npm i facebook-opening-hours-to-table
```
Unfortunately it depends on jquery for now.

##Example
Facebook hours-data looks like this:
```json
{
  "mon_1_open": "11:00",
  "mon_1_close": "20:30",
  "tue_1_open": "11:00",
  "tue_1_close": "20:30",
  "wed_1_open": "11:00",
  "wed_1_close": "20:30",
  "thu_1_open": "11:00",
  "thu_1_close": "21:00",
  "fri_1_open": "11:00",
  "fri_1_close": "21:00",
  "sat_1_open": "10:30",
  "sat_1_close": "20:30",
  "sun_1_open": "12:00",
  "sun_1_close": "19:00"
}
```
And this library creates: 
<table><tbody><tr><td><span class="days">mon - wed: </span></td><td><span class="numbers">11:00 - 20:30</span></td></tr><tr><td><span class="days">thu - fri: </span></td><td><span class="numbers">11:00 - 21:00</span></td></tr><tr><td><span class="days">sat: </span></td><td><span class="numbers">10:30 - 20:30</span></td></tr><tr><td><span class="days">sun: </span></td><td><span class="numbers">12:00 - 19:00</span></td></tr></tbody></table>

## Usage

If you already have the opening hours data from Facebook use getTableWithHoursData to get a table:
```javascript
import { getTableWithHoursData } from facebook-opening-hours-to-table;
//...
const table = getTableWithHoursData(your-fb-hours-data);
```

If you want the library to fetch the opening hours data for you, supply token and appURL to getTableWithToken:
```javascript
import { getTableWithToken } from facebook-opening-hours-to-table;
//...
getTableWithToken(token, appURL, function (table) {
  //do stuff with table
}, translationDict);
```

If you do not care for the table and just want the [intervals](#intervals) data use getIntervalWithToken:
```javascript
import { getIntervalWithToken } from facebook-opening-hours-to-table;
//...
getIntervalWithToken(token, appURL, function (intervals) {
  //do stuff with intervals
}, translationDict);
```


If you already have the Facebook opening hours data use getIntervalsWithHoursData to get to the raw intervals data:
```javascript
import { getIntervalWithHoursData } from facebook-opening-hours-to-table;
//...
var intervals = getIntervalWithHoursData(your-fb-hours-data, translationDict);
//do stuff with intervals
```

##Intervals:
Intervals is an array of intervals that is created form the opening hours data. You can use it, if you do not want a table to be generated from the Facebook hours data, but still want days with equal opening hours be compressed into one array entry:

```javascript
//This is how intervals looks like
  var intervals = [
    { 
      "open": "11:00",
      "close": "20:30",
      "from": "mon",
      "to": "wed" 
    },
    {
      "open": "11:00",
      "close": "21:00",
      "from": "thu",
      "to": "fri" 
    }, 
    { 
      "open": "10:30",
      "close": "20:30",
      "from": "sat",
      "to": "sat" 
    },
    {
      "open": "12:00",
      "close": "19:00",
      "from": "sun",
      "to": "sun" 
    } 
  ]
//Generated from:

var hours = {
  "mon_1_open": "11:00",
  "mon_1_close": "20:30",
  "tue_1_open": "11:00",
  "tue_1_close": "20:30",
  "wed_1_open": "11:00",
  "wed_1_close": "20:30",
  "thu_1_open": "11:00",
  "thu_1_close": "21:00",
  "fri_1_open": "11:00",
  "fri_1_close": "21:00",
  "sat_1_open": "10:30",
  "sat_1_close": "20:30",
  "sun_1_open": "12:00",
  "sun_1_close": "19:00"
}
```

##Translation:
Each method takes translationDict as an argument. This argument can be omitted if you are happy with Facebooks default "mon, tue,...".
If not, you can supply a dictionary like so:
```javascript
translationDict = {mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So"};
```

## Other
This library was crafted by [Calvin Claus](https://twitter.com/calvin_claus).
