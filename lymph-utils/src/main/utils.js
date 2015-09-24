var arrays = require("./arrays")

exports.args = function (args) {
    return Array.prototype.slice.call(args)
}

exports.format = function (x) {
    var a = exports.args(arguments)
    var s = a.shift()
    s.match(/\$[0-9]/g).forEach(function (p) {
        s = s.replace(p, a[p.slice(1)])
    })
    return s
}

exports.compose = function (f, g) {
    return function (x) {
        return f(g(x))
    }
}

exports.tuples2object = function (tuples) {
    var o = {}
    tuples.forEach(function (t) {
        o[t[0]] = t[1]
    })
    return o
}

exports.map = function (xs, fn) {
    if (exports.isObject(xs)) {
        var newobj = {}
        for (var key in xs) {
            newobj[key] = fn(xs[key])
        }
        return newobj
    }
    else {
        return xs.map(fn)
    }
}

exports.partial = function (fn, var_args) {
    var argsArr = arrays.slice(arguments, 1) //curried args
    return function () {
        return fn.apply(this, argsArr.concat(arrays.slice(arguments)))
    }
}

exports.find = function (xs, fn) {
    var rst = null
    for (var i = 0; i < xs.length; i++) {
        if (fn(xs[i])) {
            rst = xs[i]
            return rst
        }
    }
    return rst
}

exports.isObject = function (x) {
    return Object.prototype.toString.call(x) == "[object Object]"
}

exports.isArray = function (x) {
    return Array.isArray(x)
}

exports.hyphenify = function (x) {
    return x.replace(/[A-Z]/g, "-$&").toLowerCase()
}

exports.tail = function (x) {
    return x.slice(1)
}

exports.fname = function (fn) {
    return fn.name
}

exports.noop = function () {}

exports.expose = function () {
    var exposed = {}
    for(var i = 0; i < arguments.length; i++) {
        exposed[arguments[i].name] = arguments[i]
    }
    return exposed
}

exports.splitOn = function (c) {
    return function (str) {
        return str.split(c)
    }
}

exports.tail = function (xs) {
    return xs.slice(1)
}

exports.decode = function (str) {
    return decodeURIComponent(str || "")
}

exports.toMap = function (xs) {
    var map = {}
    for (i = 0; i < xs.length; i++) {
        map[i] = xs[i]
    }
    return map
}

exports.slicer = Array.prototype.slice

    //function F (expr) {
        //if (typeof expr == "function") {
            //return expr
        //}
        //else if (typeof expr == "string" && expr.match(/\b_\b/)) {
            //return new Function("_", "return (" + expr + ")")
        //}
        //else {
            //throw ("Invalid expression: " + expr)
        //}
    //}

    //function currier (lambda, arity, params) {
        //return function curried () {

            //var input = slicer.call(arguments)
            //,   execute = Infinity === arity && input.length === 0

            //if (params) {
                //input.unshift.apply(input, params)
            //}
            //return (input.length >= arity || execute) ? lambda.apply(this, input) : currier(lambda, arity, input)
        //}
    //}

    //function curry2 (lambda, arity) {
        //return currier(lambda, arity || lambda.length)
    //}

    //function curry (fn) {

        //var builder = function (fn, n, args) {
            //if (n == 0) {
                //return fn
            //}
            //else if (n == 1) {
                //return function () {
                    //return fn.apply(fn, args.concat(slicer.call(arguments)))
                //}
            //}
            //else {
                //return function () {
                    //return builder(fn, --n, args.concat(slicer.call(arguments)))
                //}
            //}
        //}

        //return builder(fn, fn.length, [])
    //}

    //function map (fn, sequence, object){

        //fn = F(fn)

        //var len = sequence.length,
            //result = new Array(len)

        //for (var i = 0; i < len; i++) {
            //result[i] = fn.apply(object, [sequence[i], i])
        //}

        //return result
    //}

    //function filter (fn, sequence, object) {

        //fn = F(fn)

        //var len = sequence.length,
            //result = []

        //for (var i = 0; i < len; i++) {
            //var x = sequence[i]
            //fn.apply(object, [x, i]) && result.push(x)
        //}

        //return result
    //}

    //function find (fn, sequence) {

        //fn = F(fn)

        //var len = sequence.length

        //for (var i = 0; i < len; i++) {
            //var x = sequence[i]
            //if (fn(x)) {
                //return some(x)
            //}
        //}

        //return none
    //}

    //exp.compose = function () {

        //var fns = map(F, arguments),
            //arglen = fns.length

        //return function(){
            //for (var i = arglen; --i >= 0; ) {
                //arguments = [fns[i].apply(this, arguments)]
            //}
            //return arguments[0]
        //}
    //}

    //function partial (lambda) {
        //var curried = slicer.call(arguments, 1)
        //return function partial () {
            //var params = slicer.call(arguments)
            //params.unshift.apply(params, curried)
            //return lambda.apply(this, params)
        //}
    //}

    //function cloneObject (obj) {
        //var clone = {}
        //for(var i in obj) {
            //if(typeof(obj[i])=="object") {
                //clone[i] = cloneObject(obj[i])
            //}
            //else {
                //clone[i] = obj[i]
            //}
        //}
        //return clone
    //}
