var suite = require("lymph-test").suite
var assert = require("lymph-test").assert

var router = require("../main/router")

module.exports = suite("router", function (test) {

    var route1 = {
        re   : new RegExp("^/go/([\\w]+)$"),
        names: ["p1"],
        fn   : function () {}
    }

    var route2 = {
        re   : new RegExp("^/go/([\\w]+)/([\\w]+)$"),
        names: ["p1", "p2"],
        fn   : function () {}
    }

    var route3 = {
        re   : new RegExp("^/go/foo$"),
        names: [],
        fn   : function () {}
    }

    test("parses url", function () {
        var r = router.parseURL("http://localhost:8080/#/go/foo?p1=bar")
        assert.equals(r.path, "/go/foo")
        assert.equals(r.qs, "p1=bar")
    })

    test("parses query string parameters", function () {
        var r = router.parseQueryParams("p1=foo&p2=bar")
        assert.equals(r, {p1: "foo", p2: "bar"})
    })

    test("parses 1 path parameters", function () {
        var p = { re: route1.re, names: ["p1"] }
        var r = router.parsePathParams(p, "/go/foo")
        assert.equals(r, {p1: "foo"})
    })

    test("parses 2 path parameters", function () {
        var r = router.parsePathParams(route2, "/go/foo/bar")
        assert.equals(r, {p1: "foo", p2: "bar"})
    })

    test("parses path parameters with numbers", function () {
        var r = router.parsePathParams(route1, "/go/123")
        assert.equals(r, {p1: "123"})
    })

    test("creates path pattern with 1 param", function () {
        var r = router.createPathPattern("/go/:p1")
        assert.equals(r.re, route1.re)
        assert.equals(r.names, route1.names)
    })

    test("creates path pattern with 2 param", function () {
        var r = router.createPathPattern("/go/:p1/:p2")
        assert.equals(r.re, route2.re)
        assert.equals(r.names, route2.names)
    })

    test("creates a route from path pattern and function", function () {
        var fn = function () {}
        var r = router.createRoute({ path: "/go/:p1", fn: fn})
        assert.equals(r.re, route1.re)
    })

    test("creates a router from a static pattern", function () {
        var fn = function () {}
        var r = router.createRoute({ path: "/go/foo", fn: fn})
        assert.equals(r.re, route3.re)
    })

    test("given a set of routes, return a matched route", function () {

        var routes = [
            { re: route1.re, names: route1.names, fn: fn }
        ]

        var r = router.match(routes, "/go/foo")

        assert.equals(r.fn(), "foo")

        function fn () { return "foo" }
    })
})

