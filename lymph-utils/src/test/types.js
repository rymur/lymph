var suite = require("lymph-test").suite
var assert = require("lymph-test").assert

var types = require("../main/types")

module.exports = suite("types", function (test) {

    test("define a type constructor", function () {

        var Thing = types.def("Thing", ["name", "age"])

        var t = Thing("erick", 43)

        assert.ok(t instanceof Thing, "is matching type")
        assert.equals(t, {name:"erick", age: 43})
    })
})

