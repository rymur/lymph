exports.run = function (suites) {

    var source = new EventSource("/events");
    var connectionRetryAttempts = 0
    var connectionRetryThreshold = 3

    source.addEventListener("filechanged", function(e) {
        window.location.reload()
    })

    source.addEventListener("failed", function(e) { }, false)

    source.addEventListener("error", function(e) {
        connectionRetryAttempts = connectionRetryAttempts + 1
        if (e.eventPhase == EventSource.CLOSED) {
            if (connectionRetryAttempts >= connectionRetryThreshold) {
                console.log("attempted %s reconnects without success", connectionRetryAttempts)
                source.close()
            }
            else {
                console.log("connection closed by server, trying again in a few")
            }
        }
    }, false)

    window.addEventListener("load", function () {

        var passed = 0
        var failed = 0

        suites.forEach(function (suiteFn) {
            var rst = suiteFn(log)
            passed = passed + rst.passed
            failed = failed + rst.failed
        })

        logSummary(passed, failed)
    })
}

function log (message) {
    console.log(message)
}

function logSummary (passed, failed) {

    var STYLE_PASSED = "color: green"
    var STYLE_FAILED = "color: red"
    var STYLE_NORMAL = "color: black"

    console.log("passed: %c%s %cfailed: %c%s %ctotal: %s",
        STYLE_PASSED, 
        passed,
        STYLE_NORMAL,
        STYLE_FAILED,
        failed,
        STYLE_NORMAL,
        passed + failed
    )
}

