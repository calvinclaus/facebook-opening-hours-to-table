$(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "http://excludify.com/freshberry2/",
	})
	.done(function(token) {
		setOpeningHours(token);
	})
	.fail(function( msg ) {
	})

	$('#schoen-show').click(function () {
		$('#good-weather').show().siblings().hide();
		$(this).addClass("active");
		$(this).removeClass("notactive");
		$('#schlecht-show').removeClass('active');
		$('#schlecht-show').addClass('notactive');
	});
	$('#schlecht-show').click(function () {
		$('#bad-weather').show().siblings().hide();
		$(this).addClass("active");
		$(this).removeClass("notactive");
		$('#schoen-show').removeClass('active');
		$('#schoen-show').addClass('notactive');
	});

});

function setOpeningHours(token) {
	$.ajax({
		method: "GET",
		url: "https://graph.facebook.com/freshberrywien/",
		data : {
			access_token: token,
			fields: "hours"
		}
	})
	.done(function( msg ) {
		setHours(msg.hours);
	})
	.fail(function( msg ) {
	})
}


function setHours(hours) {
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
	translateIntervals(intervals);
	createTableFromIntervals(intervals);
}	
function translateIntervals(intervals) {
	var translation= {mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So, FT"};
	for (var i = 0; i < intervals.length; i++) {
		intervals[i].to = translation[intervals[i].to];
		intervals[i].from = translation[intervals[i].from];
	}
}

function createTableFromIntervals(intervals) {
	var $table = $(document.createElement('table'));
	$table.attr('id', "good-weather")
	$('#hours-tables').append($table);
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
