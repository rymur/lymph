exports.fail = function (message) {
    throw new Error(message)
}

exports.equals = function (a, b) {

    if (typeof a === "string" && typeof b === "string") {
        if (a !== b) {
            exports.fail("'" + a + "' !== '" + b + "'")
        }
    }
    else {
        var jsonA = JSON.stringify(a)
        var jsonB = JSON.stringify(b)
        if (jsonA !== jsonB) {
            exports.fail(jsonA + " !== " + jsonB)
        }
    }
}

exports.ok = function (value) {
    if (!!!value) {
        exports.fail("value is not ok")
    }
}

