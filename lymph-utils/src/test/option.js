var suite = require("lymph-test").suite
var assert = require("lymph-test").assert

var option = require("../main/option")

module.exports = suite("option", function (test) {

    test("return a >>= f should be equivalent to f a", function () {

        var f = function(a) { return option.unit(a * 3) }

        var lhs = option.unit(5).bind(f)
        var rhs = f(5)

        assert.equals(lhs, rhs)
    })

    test("m >>= return should be equivalent to m", function () {
        var m = option.unit(5)
        var lhs = m.bind(option.unit)
        assert.equals(lhs, m)
    })

    test("(m >>= f) >>= g should be equivalent to m >>= (\\x -> fx >>= g)", function () {
        var f = function(a) { return option.unit(a * 3) }
        var g = function(a) { return option.unit(a * 5) }

        var m = option.unit(7)
        var lhs = m.bind(f).bind(g)
        var rhs = m.bind(function(x) { return f(x).bind(g) })

        assert.equals(lhs, rhs)
    })
})

