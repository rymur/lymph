var lymphUtils = require("lymph-utils")
var utils = lymphUtils.utils
var arrays = lymphUtils.arrays

function setElementAttributes (el, attributes) {
    for (var name in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, name)) {
            el.setAttribute(utils.hyphenify(name), attributes[name])
        }
    }
}

function setElementChildren (doc, el, children) {
    children.forEach(function (child) {
        if (child === null) {
            el.appendChild(doc.createComment(child))
        }
        else if (!child.nodeType) {
            el.appendChild(doc.createTextNode(child))
        }
        else {
            el.appendChild(child)
        }
    })
}

exports.createElement = function (doc, nodeName, attributes, children) {
    var el = doc.createElement(nodeName)
    setElementAttributes(el, attributes)
    if (children) {
        setElementChildren(doc, el, children)
    }
    return el
}

exports.space = function () {
    var s = document.createElement("span")
    s.innerHTML = "&nbsp;"
    return s
}

exports.addClass = function (className, el) {
    el.classList.add(className)
}

exports.removeClass = function (className, el) {
    el.classList.remove(className)
}

exports.removeClassFrom = function (selector, className) {
    var xs = arrays.slice(document.querySelectorAll(selector))
    arrays.each(utils.partial(exports.removeClass, className), xs)
}

exports.addClassTo = function (selector, className) {
    var xs = arrays.slice(document.querySelectorAll(selector))
    arrays.each(utils.partial(exports.addClass, className), xs)
}

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

tags.forEach(function (tagName) {

    exports[tagName] = function () {

        var args = Array.prototype.slice.call(arguments)

        var attributes = {}
        var children = []

        // process first argument if it's an attribute object
        if (args[0] && utils.isObject(args[0]) && !args[0].nodeType) {
            attributes = args.shift()
        }

        // process the rest of arguments
        for (var i = 0; i < args.length; i++) {
            if (args[i] && utils.isArray(args[i])) {
                children = children.concat(args[i])
            }
            else {
                children.push(args[i])
            }
        }

        return exports.createElement(window.document, tagName, attributes, children)
    }
})

