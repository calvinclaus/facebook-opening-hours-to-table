import $ from "jquery";

export function getTableWithIntervals(intervals) {
  var table = document.createElement('table');
  var tbody = document.createElement('tbody');
  table.appendChild(tbody)
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
