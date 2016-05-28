import $ from "jquery";

export function getTableWithInervals(intervals) {
  return getTableWithIntervalsAnd$(intervals, $);

}

export function getTableWithIntervalsAnd$(intervals, $) {
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
