module.exports = function (suiteName, contextFn) {

    var tests = {}

    contextFn(function (testName, testFn) {
        tests[testName] = testFn
    })

    return function run (log) {

        var passed = 0
        var failed = 0

        for (var testName in tests) {
            try {
                tests[testName]()
                passed = passed + 1
            }
            catch (e) {
                log(suiteName + " " + testName + ": " + e.message)
                failed = failed + 1
            }
        }

        return {
            passed: passed,
            failed: failed
        }
    }
}

