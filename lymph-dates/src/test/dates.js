var suite = require("lymph-test").suite
var assert = require("lymph-test").assert
var dates = require("../main/dates")

module.exports = suite("dates", function (test) {

    test("can add a given number of months", function () {
        var d1 = new Date(2010, 2, 6)
        var d2 = dates.addMonths(d1, 3)
        assert.equals(d2.getMonth(), 5)
    })

    test("can add a given number of months to feb", function () {
        var d1 = new Date(2010, 0, 31)
        var d2 = dates.addMonths(d1, 1)
        assert.equals(d2.getMonth(), 1)
    })

    test("can substract a month from the last day in feb", function () {
        var d1 = new Date(2010, 1, 28)
        var d2 = dates.addMonths(d1, -1)
        assert.equals(d2.getMonth(), 0)
    })

    test("can add a given number of days to a date", function () {
        var d1 = new Date(2010, 1, 28)
        var d2 = dates.addDays(d1, 1)
        assert.equals(d2.getMonth(), 2)
        assert.equals(d2.getDate(), 1)
    })

    test("can convert day number to friendly string", function () {
        assert.equals(dates.translateDay(0), "Sun")
    })
})
