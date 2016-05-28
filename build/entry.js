module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.getIntervalWithTokenAndHoursRequester = getIntervalWithTokenAndHoursRequester;
	exports.getTableWithTokenAndHoursRequester = getTableWithTokenAndHoursRequester;
	exports.getIntervalWithToken = getIntervalWithToken;
	exports.getTableWithToken = getTableWithToken;
	exports.getTableWithHoursData = getTableWithHoursData;
	exports.getIntervalWithHoursData = getIntervalWithHoursData;

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _getTableWithIntervals = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//This is so we can inject an hoursRequester into getIntervalWithTokenAndHoursRequester for testing
	function getIntervalWithTokenAndHoursRequester(token, appURL, callback, translationDict, hoursRequester) {
	  hoursRequester(token, appURL, function (hours) {
	    callback(getTranslatedIntervals(hours, translationDict));
	  });
	}

	function getTableWithTokenAndHoursRequester(token, appURL, callback, translationDict, hoursRequester) {
	  getIntervalWithTokenAndHoursRequester(token, appURL, function (intervals) {
	    callback((0, _getTableWithIntervals.getTableWithIntervals)(intervals));
	  }, translationDict, hoursRequester);
	}

	function getIntervalWithToken(token, appURL, callback, translationDict) {
	  getIntervalWithTokenAndHoursRequester(token, appURL, callback, translationDict, fetchHours);
	}

	function getTableWithToken(token, appURL, callback, translationDict) {
	  getTableWithTokenAndHoursRequester(token, appURL, callback, translationDict, fetchHours);
	}

	function getTableWithHoursData(hours, translationDict) {
	  return (0, _getTableWithIntervals.getTableWithIntervals)(getIntervalWithHoursData(hours, translationDict));
	}

	function getIntervalWithHoursData(hours, translationDict) {
	  return getTranslatedIntervals(hours, translationDict, translationDict);
	}

	function getTranslatedIntervals(hours, translationDict) {
	  var intervals = getIntervals(hours);
	  translateIntervals(intervals, translationDict);
	  return intervals;
	}

	function fetchHours(token, appURL, callback) {
	  _jquery2.default.ajax({
	    method: "GET",
	    url: "https://graph.facebook.com/" + appURL,
	    data: {
	      access_token: token,
	      fields: "hours"
	    }
	  }).done(function (msg) {
	    callback(msg.hours);
	  }).fail(function (msg) {
	    console.error("Failed to fetch hours data", msg);
	  });
	}

	function getIntervals(hours) {
	  var days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
	  var intervals = [];
	  var prevInterval = {};
	  for (var i = 0; i < days.length; i++) {
	    var thisDay = getDayFromHours(hours, days[i]);
	    if (!prevInterval.from) {
	      //is this the first go?
	      prevInterval = getNewInterval(thisDay);
	    } else {
	      if (thisDay.open === prevInterval.open && thisDay.close === prevInterval.close) {
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
	  if ((typeof translation === "undefined" ? "undefined" : _typeof(translation)) == ( true ? "undefined" : _typeof(undefined))) return intervals;
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

	function getNewInterval(day) {
	  return {
	    from: day.day,
	    to: day.day,
	    open: day.open,
	    close: day.close
	  };
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("jquery");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTableWithIntervals = getTableWithIntervals;
	exports.getTableWithIntervalsAnd$ = getTableWithIntervalsAnd$;

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getTableWithIntervals(intervals) {
	  return getTableWithIntervalsAnd$(intervals, _jquery2.default);
	}

	function getTableWithIntervalsAnd$(intervals, $) {
	  var $table = $(document.createElement('table'));
	  for (var i = 0; i < intervals.length; i++) {
	    var $tr = $(document.createElement('tr'));
	    var $tdLeft = $(document.createElement('td'));
	    var $tdRight = $(document.createElement('td'));
	    if (intervals[i].from !== intervals[i].to) {
	      $tdLeft.html('<span class="days">' + intervals[i].from + " - " + intervals[i].to + ': </span>');
	    } else {
	      $tdLeft.html('<span class="days">' + intervals[i].from + ': </span>');
	    }
	    $tdRight.html('<span class="numbers">' + intervals[i].open + " - " + intervals[i].close + '</span>');
	    $tr.append($tdLeft);
	    $tr.append($tdRight);
	    $table.append($tr);
	  }
	  return $table[0];
	}

/***/ }
/******/ ]);