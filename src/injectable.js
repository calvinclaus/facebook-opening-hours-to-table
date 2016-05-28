import { getTableWithToken, getTableWithHoursData, getIntervalWithToken, getIntervalWithHoursData } from './entry.js';

//This is so we can inject an hoursRequester into getIntervalWithTokenAndHoursRequester for testing
export function getIntervalWithTokenAndHoursRequester(token, appURL, callback, translationDict, hoursRequester) {
  hoursRequester(token, appURL, function (hours) {
    callback(getTranslatedIntervals(hours, translationDict));
  });
}


export function getTableWithTokenAndHoursRequester(token, appURL, callback, translationDict, hoursRequester) {
  getIntervalWithTokenAndHoursRequester(token, appURL, function(intervals, hoursRequester) {
    callback(getTableWithIntervals(intervals));
  }, translationDict);
}
