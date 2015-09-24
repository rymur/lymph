var utils = require("lymph-utils").utils

var tags = [
    "A", "ABBR", "ACRONYM", "ADDRESS", "AREA", "ARTICLE", "ASIDE", "AUDIO",
    "B", "BDI", "BDO", "BIG", "BLOCKQUOTE", "BODY", "BR", "BUTTON",
    "CANVAS", "CAPTION", "CITE", "CODE", "COL", "COLGROUP", "COMMAND",
    "DATALIST", "DD", "DEL", "DETAILS", "DFN", "DIV", "DL", "DT", "EM",
    "EMBED", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAME",
    "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEAD", "HEADER",
    "HGROUP", "HR", "HTML", "I", "IFRAME", "IMG", "INPUT", "INS", "KBD",
    "KEYGEN", "LABEL", "LEGEND", "LI", "LINK", "MAP", "MARK", "META",
    "METER", "NAV", "NOSCRIPT", "OBJECT", "OL", "OPTGROUP", "OPTION",
    "OUTPUT", "P", "PARAM", "PRE", "PROGRESS", "Q", "RP", "RT", "RUBY",
    "SAMP", "SCRIPT", "SECTION", "SELECT", "SMALL", "SOURCE", "SPAN",
    "SPLIT", "STRONG", "STYLE", "SUB", "SUMMARY", "SUP", "TABLE", "TBODY",
    "TD", "TEXTAREA", "TFOOT", "TH", "THEAD", "TIME", "TITLE", "TR",
    "TRACK", "TT", "UL", "VAR", "VIDEO", "WBR"
]

exports.buildDocumentString = function (childrenString) {
    return "<!DOCTYPE html>" + (childrenString || "") 
}

exports.buildAttributeString = function (attributes) {
    var attributeParts = []
    for (var name in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, name)) {
            attributeParts.push(utils.hyphenify(name) + '="' + attributes[name] + '"')
        }
    }
    return attributeParts.join(" ")
}

exports.buildElementString = function (nodeName, attributes) {

    var args = utils.args(arguments)
    var children = []

    args.shift()
    args.shift()

    for (var i = 0; i < args.length; i++) {
        if (utils.isArray(args[i])) {
            children = children.concat(args[i])
        }
        else {
            children.push(args[i])
        }
    }

    var attributesString = exports.buildAttributeString(attributes)

    if (attributesString.length > 0) {
        return "<" + nodeName + " " + attributesString + ">" + children.join("") + "</" + nodeName + ">"
    }
    else {
        return "<" + nodeName + ">" + children.join("") + "</" + nodeName + ">"
    }
}

exports.buildHelper = function (tagName) {

    return function () {
        var args = Array.prototype.slice.call(arguments)
        var attributes = {}
        var children = []

        // process first argument if it's an attribute object
        if (args[0] && utils.isObject(args[0])) {
            attributes = args.shift()
        }

        // process the rest of arguments
        if (args[0] && utils.isArray(args[0])) {
            children = args[0]
        }
        else {
            children = args
        }

        return exports.buildElementString(tagName, attributes, children)
    }
}

exports.helpers = {}

tags.forEach(function (tagName) {
    exports.helpers[tagName] = exports.buildHelper(tagName)
})

