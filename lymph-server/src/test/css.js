var suite = require("lymph-test").suite
var assert = require("lymph-test").assert

var css = require("../main/css")

module.exports = suite("server side css", function (test) {

    test("builds a style string with a selector", function () {
        var s = css.buildStyleString(".class", {})
        assert.equals(s, ".class{}\n")
    })

    test("builds a style string with a single properties", function () {
        var s = css.buildStyleString(".class", {color:"blue"})
        assert.equals(s, ".class{color:blue;}\n")
    })

    test("builds a style string with multiple properties", function () {
        var s = css.buildStyleString(".class", {color:"blue", width:"20px"})
        assert.equals(s, ".class{color:blue;width:20px;}\n")
    })

    test("builds a style string with hyphenated properites", function () {
        var s = css.buildStyleString(".class", {borderLeft:"1px"})
        assert.equals(s, ".class{border-left:1px;}\n")
    })

    test("builds a style string with nested styles", function () {
        var s = css.buildStyleString(".aList", {color:"red"},
            css.buildStyleString("li", {color:"blue"})
        )
        assert.equals(s, ".aList li{color:blue;}\n.aList{color:red;}\n")
    })
})

