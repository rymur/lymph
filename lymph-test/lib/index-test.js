// running test tests outside of runner due to chicken/egg
runTests(require("../src/test/suite"))
runTests(require("../src/test/assert"))

require("../src/main/runner").run([
    require("../src/test/runner")
])

function runTests (tests) {
    for (var tname in tests) {
        tests[tname]()
    }
}

