var lymphTest = require("lymph-test")
var assert = lymphTest.assert

var arrays = require("../main/arrays")

module.exports = lymphTest.suite("arrays", function (test) {

    test("can slice function arguments", function () {

        checkit("first", "foo")

        function checkit (x, var_args) {
            var args = arrays.slice(arguments, 1)
            assert.equals(args, ["foo"])
        }
    })

    test("can apply a function to each item", function () {

        var xs = [{name:"foo"}, {name:"bar"}]
        arrays.each(toUpper, xs)
        assert.equals(xs, [{name:"FOO"}, {name:"BAR"}])

        function toUpper (x) {
            x.name = x.name.toUpperCase()
        }
    })
})

