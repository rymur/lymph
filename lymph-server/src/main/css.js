var utils = require("lymph-utils").utils

exports.buildStyleString = function () {

    var selector = String(Array.prototype.shift.call(arguments))
    var rules = Array.prototype.concat.apply([], arguments)
    var css = selector + "{"
    var i = 0
    var l = rules.length
    var key
    var block

    while (i < l) {
        block = rules[i++]
        switch (typeof block) {
            case "object":
                for (key in block) {
                css += utils.hyphenify(key) + ":" + block[key] + ";"
            }
            break
            case "string":
                css = selector + " " + block + css; break;
        }
    }
    css += "}\n"
    return css
} 

