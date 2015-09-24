var assert = require("../main/assert")
var suite = require("../main/suite")

exports["explicit fail assertion"] = function () {

    try {
        assert.fail("failed")
        console.warn("assertion did not throw error")
    }
    catch (e) {
        if (e.message !== "failed") {
            console.warn("fail assertion no correct")
        }
    }
}

exports["equals assertion with strings"] = function () {

    try {
        assert.equals("foo", "bar")
        console.warn("assertion did not throw error")
    }
    catch (e) {
        if (e.message !== "'foo' !== 'bar'") {
            console.warn("equal assertion not correct")
        }
    }
}

exports["ok assertion"] = function () {

    try {
        assert.ok("foo" === "bar")
        console.warn("assertion did not throw error")
    }
    catch (e) {
        if (e.message !== "value is not ok") {
            console.warn("ok assert not correct")
        }
    }
}

exports["equals truthy assertion with object"] = function () {

    try {
        assert.equals({name: "foo"}, {name: "bar"})
        console.warn("assertion did not throw error")
    }
    catch (e) {
        if (e.message !== '{"name":"foo"} !== {"name":"bar"}') {
            console.warn("equals truthy assertion error is no correct")
        }
    }
}

exports["equals truthy assertion with objects"] = function () {

    try {
        assert.equals({name: "foo"}, {name: "foo"})
    }
    catch (e) {
        console.warn("equals truthy assertion not correct")
    }
}

