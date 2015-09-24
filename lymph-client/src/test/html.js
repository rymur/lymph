var suite = require("lymph-test").suite
var assert = require("lymph-test").assert

var html = require("../main/html")

module.exports = suite("client side html", function (test) {

    test("creates an empty for the given tag name", function () {
        var s = html.createElement(document, "div")
        assert.equals(s.outerHTML, "<div></div>")
    })

    test("creates a tag with a single attribute", function () {
        var s = html.createElement(document, "div", {id:"foo"})
        assert.equals(s.outerHTML, '<div id="foo"></div>')
    })

    test("creates a tag with multiple attributes", function () {
        var s = html.createElement(document, "div", {id:"foo", class:"bar"})
        assert.equals(s.outerHTML, '<div id="foo" class="bar"></div>')
    })

    test("creates an empty tag with one child element", function () {
        var s0 = html.createElement(document, "div")
        var s1 = html.createElement(document, "div", {}, [s0])
        assert.equals(s1.outerHTML, '<div><div></div></div>')
    })

    test("creates an empty tag with two child elements", function () {
        var s0 = html.createElement(document, "div")
        var s1 = html.createElement(document, "div")
        var s2 = html.createElement(document, "div", {}, [s0, s1])
        assert.equals(s2.outerHTML, '<div><div></div><div></div></div>')
    })

    test("creates a tag with attributes and children", function () {
        var s = html.createElement(document, "div", {id:"foo", class:"bar"}, [
            html.createElement(document, "div"), html.createElement(document, "div")
        ])
        assert.equals(s.outerHTML, '<div id="foo" class="bar"><div></div><div></div></div>')
    })

    test("hyphenates attribute names", function () {
        var s = html.createElement(document, "div", {attFoo:"foo"})
        assert.equals(s.outerHTML, '<div att-foo="foo"></div>')
    })

    test("create a tag with text data", function () {
        var s = html.createElement(document, "div", {}, ["foo"])
        assert.equals(s.outerHTML, '<div>foo</div>')
    })

    test("creates a bunch of helpers for standard html tags", function () {
        var s0 = html.DIV()
        var s1 = html.SPAN()

        assert.equals(s0.outerHTML, '<div></div>')
        assert.equals(s1.outerHTML, '<span></span>')
    })

    test("helpers support array and element type argments", function () {
        var s0 = html.createElement(document, "div")
        var s1 = html.createElement(document, "div")
        var s2 = html.createElement(document, "div")
        var s3 = html.DIV(s0, [s1, s2])
        assert.equals(s3.outerHTML,
            '<div><div></div><div></div><div></div></div>')
    })

    test("adding class name to an element", function () {
        var el = html.DIV()
        el.className = "foo"
        html.addClass("bar", el)
        assert.equals(el.className, "foo bar")
    })

    test("removing class name from an element", function () {
        var el = html.DIV()
        el.className = "foo"
        html.removeClass("foo", el)
        assert.equals(el.className, "")
    })

    test("remove class name from all selected elements", function () {
        var el1 = html.DIV()
        var el2 = html.DIV()
        el1.className = "foo"
        el2.className = "foo"

        document.body.appendChild(el1)
        document.body.appendChild(el2)

        html.removeClassFrom("div", "foo")

        assert.equals(el1.className, "")
        assert.equals(el2.className, "")

        document.body.removeChild(el1)
        document.body.removeChild(el2)
    })
})

