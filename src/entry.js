import $ from "jquery";
import { getTableWithIntervals } from './getTableWithIntervals.js';

//This is so we can inject an hoursRequester into getIntervalWithTokenAndHoursRequester for testing
export function getIntervalWithTokenAndHoursRequester(token, appURL, callback, translationDict, hoursRequester) {
  hoursRequester(token, appURL, function (hours) {
    callback(getTranslatedIntervals(hours, translationDict));
  });
}

export function getTableWithTokenAndHoursRequester(token, appURL, callback, translationDict, hoursRequester) {
  getIntervalWithTokenAndHoursRequester(token, appURL, function(intervals) {
    callback(getTableWithIntervals(intervals));
  }, translationDict, hoursRequester);
}


export function getIntervalWithToken(token, appURL, callback, translationDict) {
  getIntervalWithTokenAndHoursRequester(token, appURL, callback, translationDict, fetchHours);
}


export function getTableWithToken(token, appURL, callback, translationDict) {
  getTableWithTokenAndHoursRequester(token, appURL, callback, translationDict, fetchHours);
}



export function getTableWithHoursData(hours, translationDict) {
  return getTableWithIntervals(getIntervalWithHoursData(hours, translationDict));
}


export function getIntervalWithHoursData(hours, translationDict) {
  return getTranslatedIntervals(hours, translationDict, translationDict);
}


function getTranslatedIntervals(hours, translationDict) {
  var intervals = getIntervals(hours);
  translateIntervals(intervals, translationDict);
  return intervals;
}


function fetchHours(token, appURL, callback) {
  $.ajax({
    method: "GET",
    url: "https://graph.facebook.com/" + appURL,
    data : {
      access_token: token,
      fields: "hours"
    }
  })
  .done(function( msg ) {
    callback(msg.hours);
  })
  .fail(function( msg ) {
    console.error("Failed to fetch hours data", msg);
  })
}


function getIntervals(hours) {
  var days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  var intervals = [];
  var prevInterval = {};
  for (var i = 0; i < days.length; i++) {
    var thisDay = getDayFromHours(hours, days[i]);
    if (!prevInterval.from) { //is this the first go?
      prevInterval = getNewInterval(thisDay);
    } else {
      if (thisDay.open === prevInterval.open &&
          thisDay.close === prevInterval.close) {
            prevInterval.to = thisDay.day;
          } else {
            intervals.push(prevInterval);
            prevInterval = getNewInterval(thisDay);
          }
    }
  }
  intervals.push(prevInterval);
  return intervals;
}	

//German {mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So"}
function translateIntervals(intervals, translation) {
  if (typeof translation == typeof undefined) return intervals;
  for (var i = 0; i < intervals.length; i++) {
    intervals[i].to = translation[intervals[i].to];
    intervals[i].from = translation[intervals[i].from];
  }
}

function getDayFromHours(hours, day) {
  var get_open = day + "_" + "1" + "_" + "open";
  var get_close = day + "_" + "1" + "_" + "close";
  return getNewDay(day, hours[get_open], hours[get_close]);
}

function getNewDay(day, open, close) {
  return {
    day: day,
    open: open,
    close: close
  };
}

function getNewInterval (day) {
  return {
    from: day.day,
    to: day.day,
    open: day.open,
    close: day.close,
  }
}
