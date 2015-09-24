exports.unit = function(v) {
    return new Some(v)
}

function Some (v) {
    this.value = v
}

Some.prototype.bind = function (f) {
    return f(this.value)
}

function None () {
}

None.prototype.bind = function (f) {
    return this
}

