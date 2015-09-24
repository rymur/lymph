var u = require("lymph-utils").utils

exports.parseURL = function (url) {
    var parts = url.split("#")
    var path = ""
    var qs = ""
    if (parts[1]) {
        path = parts[1].split("?")[0]
    }

    if (parts[1]) {
        qs = parts[1].split("?")[1]
    }

    return {path: path, qs: qs}
}

exports.parseQueryParams = function (qs) {
    var s = decodeURIComponent(qs || "")
    return u.tuples2object(u.map(s.split("&"), u.splitOn("=")))
}

exports.parsePathParams = function (pattern, path) {
    var i
    var params = {}
    var matches = pattern.re.exec(path)

    for (i = 0; i < pattern.names.length; i++) {
        params[pattern.names[i]] = matches[i + 1]
    }

    return params
}

exports.trimFirst = function (str) {
    return str.slice(1)
}

exports.createPathPattern = function (path) {
    var re1 = new RegExp(":([\\w]+)", "g")
    var re2 = new RegExp("^" + path.replace(re1, "([\\w-]+)") + "$");
    var params = path.match(re1) || []
    return { re: re2, names: params.map(exports.trimFirst) }
}

exports.match = function (routes, path) {
    return u.find(routes, function (x) {
        return x.re.test(path)
    })
}

exports.createRoute = function (parts) {
    var p0 = exports.createPathPattern(parts.path)
    p0.fn = parts.fn
    return p0
}

exports.matcher = function (routes) {
    var rs = routes.map(exports.createRoute)
    return function (path) {
        var r = exports.match(rs, path)
        r.fn(exports.parsePathParams(r, path))
    }
}

