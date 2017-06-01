function msToDowntime(duration) {
    var seconds = ((duration/1000) % 60).toFixed(2)
        , minutes = (duration/(1000 * 60) % 60).toFixed(2)
        , hours = ((duration/(1000 * 60 * 60)) % 24).toFixed(2)
        , days = ((duration/(1000 * 60 * 60 * 24))).toFixed(2);

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };
};

function showTime(downtime) {
    var output = "";
    for (var key in downtime) {
        if (Math.floor(downtime[key]) != 0
            || (downtime[key] > 0 && downtime[key] < 1 && key == "seconds")
        )  {
            output += downtime[key] + " "+ key;
            break;
        }
    }
    return output
};

function downtimeToMs(val) {
    return 3600000 - (3600000 * (val/100));
};

function availabilityCalculator() {
    var percentage = document.getElementById("availability");
    var currentLevel = percentage.value;
	var output;
	if (isNaN(currentLevel) || currentLevel < 1 || currentLevel > 100) {
			output = "<em>Input not valid. Please input a number between 1 and 100.</em>";
	} else {
		output =
			"<table id='custom-table'>"
			+ "<tr>"
			+ "<th>Availability level</th>"
			+ "<th>Downtime per year</th>"
			+ "<th>Downtime per quarter</th>"
			+ "<th>Downtime per month</th>"
			+ "<th>Downtime per week</th>"
			+ "<th>Downtime per day</th>"
			+ "<th>Downtime per hour</th>"
			+ "</tr>";

			var ms_per_hour = downtimeToMs(currentLevel);
			var ms_per_day = ms_per_hour * 24;
			var ms_per_week = ms_per_day * 7;
			var ms_per_year = ms_per_day * 365.2425; // Gregorian, on average (https://en.wikipedia.org/wiki/Year#Summary)
			var ms_per_month = ms_per_year / 12;
			var ms_per_quarter = ms_per_year / 4;

			var downtime_per_year    =  msToDowntime(ms_per_year);
			var downtime_per_quarter =  msToDowntime(ms_per_quarter);
			var downtime_per_month =  msToDowntime(ms_per_month);
			var downtime_per_week =  msToDowntime(ms_per_week);
			var downtime_per_day =  msToDowntime(ms_per_day);
			var downtime_per_hour =  msToDowntime(ms_per_hour);

			output += "<tr>"
				+ "<td>" + currentLevel + "%</td>"
				+ "<td>" + showTime(downtime_per_year) + "</td>"
				+ "<td>" + showTime(downtime_per_quarter) + "</td>"
				+ "<td>" + showTime(downtime_per_month) + "</td>"
				+ "<td>" + showTime(downtime_per_week) + "</td>"
				+ "<td>" + showTime(downtime_per_day) + "</td>"
				+ "<td>" + showTime(downtime_per_hour) + "</td>"
				+ "</tr>";

		output += "</table>";
	}
    document.getElementById("availability-table").innerHTML = output;
};
