var suite = require("lymph-test").suite
var assert = require("lymph-test").assert

var utils = require("../main/utils")

module.exports = suite("utils", function (test) {

    test("should hyphenify strings", function () {
        var h = utils.hyphenify("camelCase")
        assert.equals(h, "camel-case")
    })

    test("retrieves a function's name", function () {
        function foo () {}
        assert.equals(utils.fname(foo), "foo")
    })

    test("builds an object with a given set of functions", function () {
        function foo () {return "foo"}
        function bar () {return "bar"}

        var exposed = utils.expose(foo, bar)

        assert.equals(exposed.foo(), "foo")
        assert.equals(exposed.bar(), "bar")
    })

    test("get tail of an array", function () {
        var x = utils.tail(["one", "two"])
        assert.equals(x, ["two"])
    })

    test("splits a string on a charachter", function () {
        var x = utils.splitOn(":")("foo:bar")

        assert.equals(x, ["foo", "bar"])
    })

    test("tuples to object", function () {
        var tuples = [["one", "foo"], ["two","bar"]]
        var o = utils.tuples2object(tuples)

        assert.equals(o, {one:"foo", two:"bar"})
    })

    test("find an array item based on a condition", function () {
        var xs = ["one", "foo", "two","bar"]
        var x = utils.find(xs, function (x) { return x.indexOf("f") === 0 })

        assert.equals(x, "foo")
    })

    test("partial application", function () {
        var f1 = utils.partial(foo, 1)

        assert.equals(f1(2), 3)

        function foo (x, y) {
            return x + y
        }
    })
})

