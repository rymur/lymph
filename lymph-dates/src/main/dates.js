var days = [
    { full: "Sunday",    abreviation: "Sun" }, 
    { full: "Monday",    abreviation: "Mon" }, 
    { full: "Tuesday",   abreviation: "Tue" }, 
    { full: "Wednesday", abreviation: "Wed" }, 
    { full: "Thursday",  abreviation: "Thu" }, 
    { full: "Friday",    abreviation: "Fri" }, 
    { full: "Saturday",  abreviation: "Sat" }
]

exports.addMonths = function (startDate, offset) {
    var dt = new Date(startDate)
    dt.setMonth(dt.getMonth() + offset)
    if (dt.getDate() < startDate.getDate()) {
        dt.setDate(0)
    }
    return dt
}

exports.addDays = function (startDate, offset) {
    var dt = new Date(startDate)
    dt.setDate(dt.getDate() + offset)
    return dt
}

exports.translateDay = function (day) {
    return days[day].abreviation
}

