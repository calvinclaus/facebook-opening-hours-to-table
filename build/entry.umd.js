(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("facebookOpeningHoursToTable", [], factory);
	else if(typeof exports === 'object')
		exports["facebookOpeningHoursToTable"] = factory();
	else
		root["facebookOpeningHoursToTable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	
	exports.getTableWithHours = getTableWithHours;
	exports.getIntervalsWithHours = getIntervalsWithHours;
	
	var _getTableWithIntervals = __webpack_require__(1);
	
	function getTableWithHours(hours, translationDict) {
	  return (0, _getTableWithIntervals.getTableWithIntervals)(getIntervalsWithHours(hours, translationDict));
	}
	
	function getIntervalsWithHours(hours, translationDict) {
	  return getTranslatedIntervals(hours, translationDict, translationDict);
	}
	
	function getTranslatedIntervals(hours, translationDict) {
	  var intervals = getIntervals(hours);
	  translateIntervals(intervals, translationDict);
	  return intervals;
	}
	
	function getIntervals(hours) {
	  var days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
	  var intervals = [];
	  var prevInterval = {};
	  for (var i = 0; i < days.length; i++) {
	    var thisDay = getDayFromHours(hours, days[i]);
	    if (i == 0) {
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
	
	//German: {mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So"}
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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTableWithIntervals = getTableWithIntervals;
	function getTableWithIntervals(intervals) {
	  var table = document.createElement('table');
	  var tbody = document.createElement('tbody');
	  table.appendChild(tbody);
	  for (var i = 0; i < intervals.length; i++) {
	    var tr = document.createElement('tr');
	    var tdLeft = document.createElement('td');
	    var tdRight = document.createElement('td');
	    if (intervals[i].from !== intervals[i].to) {
	      tdLeft.innerHTML = '<span class="days">' + intervals[i].from + " - " + intervals[i].to + ': </span>';
	    } else {
	      tdLeft.innerHTML = '<span class="days">' + intervals[i].from + ': </span>';
	    }
	    tdRight.innerHTML = '<span class="numbers">' + intervals[i].open + " - " + intervals[i].close + '</span>';
	    tr.appendChild(tdLeft);
	    tr.appendChild(tdRight);
	    tbody.appendChild(tr);
	  }
	  return table;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=entry.umd.js.map