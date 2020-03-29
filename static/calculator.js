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

    if (isNaN(currentLevel) || currentLevel <= 0 || currentLevel > 100) {
        output = "<em class=\"tc\">Input not valid. Please input a number between 0 and 100.</em>";
    } else {
        output =
            "<table class=\"f6 w-100 mw8 center\" cellspacing=\"0\">"
            + "<tr>"
            + "<th class=\"fw6 bb b--black-20 pb3 \">Availability level</th>"
            + "<th class=\"fw6 bb b--black-20 pb3 pr3 \">Downtime per year</th>"
            + "<th class=\"fw6 bb b--black-20 pb3 pr3 \">Downtime per quarter</th>"
            + "<th class=\"fw6 bb b--black-20 pb3 pr3 \">Downtime per month</th>"
            + "<th class=\"fw6 bb b--black-20 pb3 pr3 \">Downtime per week</th>"
            + "<th class=\"fw6 bb b--black-20 pb3 pr3 \">Downtime per day</th>"
            + "<th class=\"fw6 bb b--black-20 pb3 pr3 \">Downtime per hour</th>"
            + "</tr>";

            var ms_per_hour = downtimeToMs(currentLevel)
                , ms_per_day = ms_per_hour * 24
                , ms_per_week = ms_per_day * 7
                , ms_per_year = ms_per_day * 365.2425 // Gregorian, on average (https://en.wikipedia.org/wiki/Year#Summary)
                , ms_per_month = ms_per_year / 12
                , ms_per_quarter = ms_per_year / 4;

            var categories = [ms_per_year, ms_per_quarter
                , ms_per_month, ms_per_week, ms_per_day
                , ms_per_hour];

        output += "<tr><td class=\"pr3 bb b--black-20\">" + currentLevel + "%</td>";
            for (i = 0; i < categories.length; i++) {
                if (currentLevel == 100) {
                    output += "<td class=\"pr3 bb b--black-20\">" + 0 + "</td>";
                } else {
                    output += "<td class=\"pr3 bb b--black-20\">" + showTime(msToDowntime(categories[i])) + "</td>";
                }
            }
            output += "</tr></table>";
    }
    document.getElementById("availability-table").innerHTML = output;
};
