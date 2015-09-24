var suite = require("../main/suite")
var assert = require("../main/assert")

module.exports = suite("runner tests", function (t) {

    t("t1", function () {
        assert.equals(true, true)
    })

    t("t2", function () {
        assert.equals("foo", "foo")
    })
})

