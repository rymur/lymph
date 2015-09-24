var suite = require("../main/suite")

exports["should return passed/failed counts"] = function () {

    var s = suite("suite name", function (t) {
        t("t1", function () { })
        t("t2", function () {
            throw new Error("failed")
        })
        t("t3", function () { })
    })

    var results = s(function () {})

    if (results.passed !== 2) {
        console.warn("passed count was not correct")
    }
    
    if (results.failed !== 1) {
        console.warn("failed count was not correct")
    }
}

exports["should call passed test function"] = function () {

    var called = false

    var s = suite("s1", function (t) {

        t("t1", function () {
            called = true
        })
    })

    s(function () {})

    if (!called) {
        console.warn("was not called")
    }
}

exports["should log failed assertions"] = function () {

    var s = suite("s1", function (t) {

        t("t1", function () {
            throw new Error("failed")
        })
    })

    s(function (message) {
        if (message !== "s1 t1: failed") {
            console.warn("assertion log message is incorrect")
        }
    })
}

