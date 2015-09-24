var suite = require("lymph-test").suite
var assert = require("lymph-test").assert

var ajax = require("../main/ajax")

module.exports = suite("ajax", function (test) {

    test("retrieves some json data from a remote server", function () {

        var xhr = fakeXHR([])

        ajax.get(xhr, "/json", function (data) {
            assert.equals(data, [])
        })
    })

    test("retrieves text data from a remote server", function () {

        var xhr = fakeXHR("hello")

        ajax.get(xhr, "/text", function (data) {
            assert.equals(data, "hello")
        })
    })

})

function fakeXHR (data, type) {
    return {
        readyState: 4,
        getResponseHeader: function () {
            return (type === "json") ?  "application/json" : "text/plain"
        },
        responseText: data,
        onreadystatechange: function () {},
        open: function () {},
        send: function () {
            this.onreadystatechange()
        }
    }
}

