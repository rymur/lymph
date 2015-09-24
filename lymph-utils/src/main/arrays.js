exports.slice = function (arr, offset){
    return Array.prototype.slice.call(arr, offset || 0)
}

exports.each = function (fn, xs){
    for (var i = 0; i < xs.length; i++) {
        fn(xs[i])
    }
}

