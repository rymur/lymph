var suite = require("lymph-test").suite
var assert = require("lymph-test").assert

var html = require("../main/html")

module.exports = suite("server side html", function (test) {

    test("creates an empty for the given tag name", function () {
        var s = html.buildElementString("div")
        assert.equals(s, "<div></div>")
    })

    test("creates a tag with a single attribute", function () {
        var s = html.buildElementString("div", {id:"foo"})
        assert.equals(s, '<div id="foo"></div>')
    })

    test("creates a tag with multiple attributes", function () {
        var s = html.buildElementString("div", {id:"foo", class:"bar"})
        assert.equals(s, '<div id="foo" class="bar"></div>')
    })

    test("creates an nested tag with one child element", function () {
        var s0 = html.buildElementString("div")
        var s1 = html.buildElementString("div", {}, [s0])
        assert.equals(s1, '<div><div></div></div>')
    })

    test("creates an nested tag with two child elements", function () {
        var s0 = html.buildElementString("div")
        var s1 = html.buildElementString("div")
        var s2 = html.buildElementString("div", {}, [s0, s1])
        assert.equals(s2, '<div><div></div><div></div></div>')
    })

    test("creates an nested tag with array and object child elements", function () {
        var s0 = html.buildElementString("div")
        var s1 = html.buildElementString("div")
        var s2 = html.buildElementString("div")
        var s3 = html.buildElementString("div", {}, [s0, s1], s2)
        assert.equals(s3, '<div><div></div><div></div><div></div></div>')
    })

    test("creates a tag with attributes and children", function () {
        var s = html.buildElementString("div", {id:"foo", class:"bar"}, [
            html.buildElementString("div"), html.buildElementString("div")
        ])
        assert.equals(s, '<div id="foo" class="bar"><div></div><div></div></div>')
    })

    test("hyphenates attribute names", function () {
        var s = html.buildElementString("div", {attFoo:"foo"})
        assert.equals(s, '<div att-foo="foo"></div>')
    })

    test("create a tag with text data", function () {
        var s = html.buildElementString("div", {}, ["foo"])
        assert.equals(s, '<div>foo</div>')
    })

    test("creates a helper function for building a simple element strings", function () {
        var h = html.buildHelper("div")
        assert.equals(h(), '<div></div>')
    })

    test("creates a helper function for building element strings with attributes", function () {
        var h = html.buildHelper("div")
        assert.equals(h({id:"foo"}), '<div id="foo"></div>')
    })

    test("creates a helper function that excepts only a 'splat' of children", function () {
        var h = html.buildHelper("div")
        var s = h(html.buildElementString("div"), html.buildElementString("div"))
        assert.equals(s, '<div><div></div><div></div></div>')
    })

    test("creates a helper function that excepts attributes and a 'splat' of children", function () {
        var h = html.buildHelper("div")
        var s = h({id:"foo"}, html.buildElementString("div"), html.buildElementString("div"))
        assert.equals(s, '<div id="foo"><div></div><div></div></div>')
    })

    test("creates a bunch of helpers for standard html tags", function () {
        var s0 = html.helpers.DIV()
        assert.equals(s0, '<DIV></DIV>')

        var s1 = html.helpers.SPAN()
        assert.equals(s1, '<SPAN></SPAN>')
    })

    test("creates an empty doc string", function () {
        var s = html.buildDocumentString()
        assert.equals(s, '<!DOCTYPE html>')
    })

    test("creates a doc string with children", function () {
        var s = html.buildDocumentString("<html></html>")
        assert.equals(s, '<!DOCTYPE html><html></html>')
    })
})

