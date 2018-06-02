# facebook-opening-hours-to-table
Generates an html table from Facebook page opening hours data, such that days with equal opening hours are on one table row.

[![travis build](https://img.shields.io/travis/calvinclaus/facebook-opening-hours-to-table.svg?style=flat)](https://travis-ci.org/calvinclaus/facebook-opening-hours-to-table)
[![codecov coverage](https://img.shields.io/codecov/c/github/calvinclaus/facebook-opening-hours-to-table.svg?style=flat)](https://codecov.io/github/calvinclaus/facebook-opening-hours-to-table)
[![version](https://img.shields.io/npm/v/facebook-opening-hours-to-table.svg?style=flat)](http://npm.im/facebook-opening-hours-to-table)
[![downloads](https://img.shields.io/npm/dm/facebook-opening-hours-to-table.svg?style=flat)](http://npm-stat.com/charts.html?package=facebook-opening-hours-to-table&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/facebook-opening-hours-to-table.svg?style=flat)](http://opensource.org/licenses/MIT)

![Open 24 hours](http://i.giphy.com/d2VNLfm0VNWDv3wY.gif)

## Installation

###npm

This package is distributed via npm:

```
npm i facebook-opening-hours-to-table
```

It has no dependencies.

### Browser
Get the file from [https://unpkg.com/facebook-opening-hours-to-table/build](https://unpkg.com/facebook-opening-hours-to-table/build) and put it in a script tag:
```html
<script src="entry.umd.min.js"></script>
//Functions now at facebookOpeningHoursToTable.getTableWithHours(hours, translationDict);
```


## Demo
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

###Getting the table
Use this method if you want an html table.

Fetch the opening hours data from Facebook and pass it to getTableWithHours.
```javascript
import { getTableWithHours } from Facebook-opening-hours-to-table;
//...
const table = getTableWithHoursData(yourFBHoursData, translationDict);
//do stuff with table
```

### Getting Intervals Data
Use this method if you do not care for the table and just want the [intervals](#intervals) data.

Fetch the opening hours data from Facebook and pass it to getIntervalsWithHours to get to the raw [intervals](#intervals) data:
```javascript
import { getIntervalsWithHours } from facebook-opening-hours-to-table;
//...
var intervals = getIntervalsWithHours(yourFBHoursData, translationDict);
//do stuff with intervals
```

### Intervals:
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

### Translation:
Each method takes translationDict as an argument. This argument can be omitted if you are happy with Facebooks default "mon, tue,...".
If not, you can supply a dictionary like so:
```javascript
translationDict = {mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So"};
```

## Example Usage
```javascript
	$.ajax({
		method: "GET",
		url: "https://graph.facebook.com/QuellenStr", //Schnitzelhaus Vienna :)
		data : {
			access_token: token,
			fields: "hours"
		}
	})
	.done(function( msg ) {
         var hours = msg.hours;
         var translationDict = {mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So"};
         var table = facebookOpeningHoursToTable.getTableWithHours(hours, translationDict);
         document.body.appendChild(table);
	})
```
*Note: you can use any ajax-request library. I chose to use jQuery in this example. This library does NOT depend on jQuery*


## Other
If this helped you out, make my day by [letting me know](https://twitter.com/calvin_claus)!

This library was crafted with care by [Calvin Claus](https://twitter.com/calvin_claus).

